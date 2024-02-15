import ChatMessageForm from "./ChatMessageForm";

const AddMessages = (datas, parentNode, chatMembers, direction) => {
  const $fragment = document.createDocumentFragment();
  for (let i = 0; i < datas.length; i++) {
    let same = false;
    if (i) {
      if (
        datas[i - 1].from === datas[i].from &&
        datas[i].timeStamp - datas[i - 1].timeStamp < 10000
      ) {
        same = true;
      }
    }

    let profileImage = "";
    for (const member of chatMembers) {
      if (member.username === datas[i].from) {
        profileImage = member.profileImage;
        break;
      }
    }

    ChatMessageForm(datas[i], $fragment, same, profileImage);
  }

  if (direction === "prepend") {
    parentNode.prepend($fragment);
  } else {
    parentNode.appendChild($fragment);
  }
  return true;
};

export default AddMessages;
