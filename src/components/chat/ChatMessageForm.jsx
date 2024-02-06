const ChatMessageForm = (message, index) => {
  const className = message[1] === "me" ? "member-me" : "member-other";
  const hidden = message[1] === "me" ? "hidden" : "";
  return (
    <div className={className} key={index}>
      <div className={`profile-img ${hidden}`}></div>
      <div className="text">{message[0]}</div>
    </div>
  );
};

export default ChatMessageForm;
