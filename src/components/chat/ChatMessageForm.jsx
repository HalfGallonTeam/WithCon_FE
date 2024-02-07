const ChatMessageForm = (newMessage, index) => {
  const message = JSON.parse(newMessage);
  const className = message.from === "me" ? "member-me" : "member-other";
  const hidden = message.from === "me" ? "hidden" : "";

  return (
    <div className={className} key={index}>
      <div className={`profile-img ${hidden}`}></div>
      <div className="text">{message.text}</div>
      <div className="message-time">{timeToString(message.timeStamp)}</div>
    </div>
  );
};

const timeToString = (num) => {
  const time = new Date(num);
  const hours = timestringToDouble(time.getHours());
  const minutes = timestringToDouble(time.getMinutes());
  const seconds = timestringToDouble(time.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};

const timestringToDouble = (num) => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

export default ChatMessageForm;
