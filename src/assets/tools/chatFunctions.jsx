import AddMessages from "../../components/chat/AddMessages";
import instance from "../constants/instance";
//const instance = axios.create({ baseURL: "http://localhost:3000" });

const ChatConcentration = class {
  constructor(chatRoomId, myId, lastMessageRef) {
    this.chatRoomId = chatRoomId;
    this.myId = myId;
    this.lastMessageRef = lastMessageRef;
  }

  sendVisible(visibleType) {
    const obj = {
      chatRoomId: this.chatRoomId,
      visibleType: visibleType,
    };
    return obj;
  }

  enterRoomNow = () => {
    const data = {
      chatRoomId: this.chatRoomId,
      targetId: this.myId,
      messageType: "ENTER",
    };
    instance.post("/notification/chatRoom-event", data);
    instance.post("/notification/visible", this.sendVisible("VISIBLE"));
  };

  changeVisibility = () => {
    const visibility = document.hidden ? "HIDDEN" : "VISIBLE";
    /**instance.post("/notification", sendVisible(visibility));
      navigator.sendBeacon(
        "http://localhost:3000/notification",
        sendVisible(visibility)
      );*/
    instance.post("/notification/visible", this.sendVisible(visibility));
    if (document.hidden) {
      const id = this.lastMessageRef.current;
      localStorage.setItem("chat", JSON.stringify(id));
    }
  };

  beforeUnload = () => {
    instance.post("/notification/visible", this.sendVisible("HIDDEN"));
    const id = this.lastMessageRef.current;
    localStorage.setItem("chat", JSON.stringify(id));
  };

  hashChange = () => {
    instance.post("/notification/visible", this.sendVisible("HIDDEN"));
    const id = this.lastMessageRef.current;
    localStorage.setItem("chat", JSON.stringify(id));
    window.removeEventListener("popstate", this.hashChange);
  };
};

const ChatMessageBundle = class {
  constructor(
    firstMessageRef,
    lastMessageRef,
    messageRef,
    chatMembersRef,
    myId,
    setIsPrev,
    setPrevMessage,
    chatRoomId
  ) {
    this.firstMessageRef = firstMessageRef;
    this.lastMessageRef = lastMessageRef;
    this.messageRef = messageRef;
    this.chatMembersRef = chatMembersRef;
    this.myId = myId;
    this.setIsPrev = setIsPrev;
    this.setPrevMessage = setPrevMessage;
    this.chatRoomId = chatRoomId;
  }

  //이전 메세지 호출 함수. id 숫자 계산해서 요청.
  callMessageBefore = async () => {
    let url = `/chatRoom/${this.chatRoomId}/message`;
    url += `?_start=${Math.max(
      0,
      this.firstMessageRef.current - 11
    )}&_limit=10`;
    const response = await instance.get(url);
    const datas = await response.data;
    if (datas.length < 10) this.setIsPrev(false); //적절한 쿼리스트링 필요.
    this.firstMessageRef.current = datas[0].id;
    AddMessages(
      datas,
      this.messageRef.current,
      this.chatMembersRef.current,
      "prepend",
      this.myId
    );
  };

  callInitialMessages = async () => {
    try {
      let startId = localStorage.getItem("chat");
      let url = `/chatRoom/${this.chatRoomId}/message`;
      url += startId
        ? `?_start=${startId - 1}&_limit=10`
        : "?_start=1&_limit=30";
      const response2 = await instance.get(url);
      const datas2 = await response2.data;

      //로컬스토리지용 아이디 세팅
      this.firstMessageRef.current = datas2[0]?.id || 0;
      this.lastMessageRef.current = datas2[datas2.length - 1]?.id;
      this.setPrevMessage(datas2[datas2.length - 1]);

      AddMessages(
        datas2,
        this.messageRef.current,
        this.chatMembersRef.current,
        "append",
        this.myId
      );
      if (datas2.length < 10) {
        await this.callMessageBefore();
        this.messageRef.current.scrollIntoView(false);
      } else {
        this.messageRef.current.scrollIntoView(true);
      }
    } catch (error) {
      console.error(error, "에러");
    }
  };
};

export { ChatMessageBundle, ChatConcentration };
