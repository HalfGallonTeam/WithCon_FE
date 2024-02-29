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
    instance.post("/notification/visible", this.sendVisible(visibility));
    /**if (document.hidden) {
      const id = this.lastMessageRef.current;
      const chatIds = JSON.parse(localStorage.getItem("chat"));
      chatIds[this.chatRoomId] = id;
      localStorage.setItem("chat", JSON.stringify(chatIds));
    }*/
  };

  beforeUnload = () => {
    instance.post("/notification/visible", this.sendVisible("HIDDEN"));
    /**
    const id = this.lastMessageRef.current;
    const chatIds = JSON.parse(localStorage.getItem("chat"));
    chatIds[this.chatRoomId] = id;
    localStorage.setItem("chat", JSON.stringify(chatIds));
     */
  };

  hashChange = () => {
    instance.post("/notification/visible", this.sendVisible("HIDDEN"));
    window.removeEventListener("popstate", this.hashChange);
    /**const id = this.lastMessageRef.current;
    const chatIds = JSON.parse(localStorage.getItem("chat"));
    chatIds[this.chatRoomId] = id;
    localStorage.setItem("chat", JSON.stringify(chatIds));
    */
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
    prevMessage,
    chatRoomId
  ) {
    this.firstMessageRef = firstMessageRef;
    this.lastMessageRef = lastMessageRef;
    this.messageRef = messageRef;
    this.chatMembersRef = chatMembersRef;
    this.myId = myId;
    this.setIsPrev = setIsPrev;
    this.prevMessage = prevMessage;
    this.chatRoomId = chatRoomId;
  }

  //이전 메세지 호출 함수. id 숫자 계산해서 요청.
  callMessageBefore = async () => {
    try {
      let url = `/chatRoom/${this.chatRoomId}/message`;
      url += `?lastMsgId=${this.firstMessageRef.current - 1}&_limit=10`;
      const response = await instance.get(url);
      const datas = await response.data.content;
      this.firstMessageRef.current = await datas[datas.length - 1]?.messageId;
      AddMessages(
        datas,
        this.messageRef.current,
        this.chatMembersRef.current,
        "prepend",
        this.myId
      );
      console.log(datas.length, "datas length");
      if (datas.length && datas.length < 10) {
        this.setIsPrev(false);
      }
      return true;
    } catch (error) {
      this.setIsPrev(false);
      console.error(error, "에러");
    }
  };

  callInitialMessages = async () => {
    try {
      //let lastMsgId = JSON.parse(localStorage.getItem("chat"))?.this.chatRoomId;
      let url = `/chatRoom/${this.chatRoomId}/message`;
      const response2 = await instance.get(url);
      const datas2 = await response2.data.content;

      //로컬스토리지용 아이디 세팅
      //this.firstMessageRef.current = datas2[0]?.id || 0;
      this.firstMessageRef.current = await datas2[datas2.length - 1]?.messageId;
      //this.prevMessage.current = datas2[datas2.length - 1];

      AddMessages(
        datas2,
        this.messageRef.current,
        this.chatMembersRef.current,
        "prepend",
        this.myId
      );
      await this.callMessageBefore();
      this.messageRef.current.scrollIntoView(false);
    } catch (error) {
      console.error(error, "에러");
    }
  };
};

export { ChatMessageBundle, ChatConcentration };
