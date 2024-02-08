const ChatMessageForm = (newMessage, index, same) => {
  const message = JSON.parse(newMessage);
  const className =
    message.from === "me"
      ? "member-me"
      : message.from === "system"
      ? "system-message"
      : "member-other";
  const invisible = same ? "invisible" : "";

  return (
    <div className={className} key={index}>
      <img src="/" alt="프로필" className={`profile-img ${invisible}`}></img>
      <div className="chat-message-info">
        <p className="text">{message.text}</p>
        <p className="message-time">{timeToString(message.timeStamp)}</p>
      </div>
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
