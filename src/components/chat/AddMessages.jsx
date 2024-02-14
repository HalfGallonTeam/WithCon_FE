import ChatMessageForm from "./ChatMessageForm";

const AddMessages = (datas, parentNode, direction) => {
  const $fragment = document.createDocumentFragment();
  datas.forEach((data, index) => {
    let same = false;
    if (index) {
      if (
        datas[index - 1].from === data.from &&
        data.timeStamp - datas[index - 1].timeStamp < 10000
      ) {
        same = true;
      }
    }
    ChatMessageForm(data, $fragment, same);
  });

  if (direction === "prepend") {
    parentNode.prepend($fragment);
  } else {
    parentNode.appendChild($fragment);
  }
  return true;
};

export default AddMessages;
