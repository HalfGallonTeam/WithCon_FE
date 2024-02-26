import ChatMessageForm from "./ChatMessageForm";

const AddMessages = (datas, parentNode, chatMembers, direction, me) => {
  const $fragment = document.createDocumentFragment();
  for (let i = 0; i < datas.length; i++) {
    let same = false;
    if (i) {
      if (
        datas[i - 1].memberId === datas[i].memberId &&
        datas[i].sendAt - datas[i - 1].sendAt < 10000
      ) {
        same = true;
      }
    }

    let memberdata = "";
    if (datas[i].memberId === me) {
      datas[i].memberId = 0;
    } else {
      for (const member of chatMembers) {
        if (member.memberId === datas[i].memberId) {
          memberdata = member;
          break;
        }
      }
    }

    ChatMessageForm(datas[i], $fragment, same, memberdata);
  }

  if (direction === "prepend") {
    parentNode.prepend($fragment);
  } else {
    parentNode.appendChild($fragment);
  }
  return true;
};

export default AddMessages;
