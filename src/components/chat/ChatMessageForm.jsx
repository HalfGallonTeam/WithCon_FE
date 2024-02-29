const ChatMessageForm = (message, parentNode, same, memberdata) => {
  const $node = document.createElement("div");
  const $img = document.createElement("img");
  const $chatTexts = document.createElement("div");
  const $chatMessageInfo = document.createElement("div");
  const $username = document.createElement("p");
  const $text = document.createElement("p");
  const $time = document.createElement("p");

  $node.className =
    message.messageType !== "CHAT"
      ? "system-message"
      : message.memberId === 0
      ? "member-me"
      : "member-other";
  $text.className = "text";
  $text.innerText = message.message;

  if (message.messageType === "CHAT") {
    $img.src =
      memberdata.userProfile || "https://dummyimage.com/50/36da93/#36DA9.jpg";
    $img.alt = "";
    $img.className = "profile-img";
    $chatTexts.className = "chat-texts";
    $chatMessageInfo.className = "chat-message-info";
    $username.className = "username";
    $username.innerText = memberdata.nickName;
    if (message.memberId === 0 || same) {
      $img.classList.add("invisible");
      $username.classList.add("hidden");
    }
    $time.className = "message-time";
    $time.innerText = timeToString(message.sendAt);

    $chatMessageInfo.appendChild($text);
    $chatMessageInfo.appendChild($time);
    $chatTexts.appendChild($username);
    $chatTexts.appendChild($chatMessageInfo);
    $node.appendChild($img);
    $node.appendChild($chatTexts);
  } else {
    $node.appendChild($text);
  }

  parentNode.appendChild($node);
  return true;

  /**<div className="system-message">
    <div className="profile-img"></div>
    <div className="text">입장하였습니다.</div>
    <div className="message-time">nan:nan:nan</div>
  </div>

  <div className={className} key={index}>
    <img src="/" alt="프로필" className={`profile-img ${invisible}`}></img>
    <div className="chat-texts">
      <p className="username">{message.from}</p>
      <div className="chat-message-info">
        <p className="text">{message.text}</p>
        <p className="message-time">{timeToString(message.timeStamp)}</p>
      </div>
    </div>
  </div>;*/
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
