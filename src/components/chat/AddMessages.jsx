import ChatMessageForm from "./ChatMessageForm";

const AddMessages = (datas, parentNode, chatMembers, direction, me) => {
  console.log("addmessage 돌아요");
  const newDatas = [];
  for (let i = datas.length - 1; i >= 0; i--) {
    newDatas[newDatas.length] = datas[i];
  }

  const $fragment = document.createDocumentFragment();
  for (let i = 0; i < newDatas.length; i++) {
    let memberdata = "";
    let same = false;
    if (newDatas[i].memberId === me) {
      newDatas[i].memberId = 0;
    } else {
      for (const member of chatMembers) {
        if (member.memberId === newDatas[i].memberId) {
          memberdata = member;
          break;
        }
      }
      if (i) {
        if (
          newDatas[i - 1].memberId === newDatas[i].memberId &&
          newDatas[i].sendAt - newDatas[i - 1].sendAt < 10000
        ) {
          same = true;
        }
      }
    }

    ChatMessageForm(newDatas[i], $fragment, same, memberdata);
  }

  if (direction === "prepend") {
    parentNode.prepend($fragment);
  } else {
    parentNode.appendChild($fragment);
  }
  return true;
};

export default AddMessages;
