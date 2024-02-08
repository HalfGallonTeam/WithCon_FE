const ButtonModal = ({
  text,
  buttonContainer,
  button1,
  button2,
  onClickButton1,
  onClickButton2,
  textColor,
}) => {
  return (
    <div className="modal-container">
      <div className="text-container">
        <span
          className={`modal-text" ${textColor ? `modal-${textColor}` : ""} `}
        >
          {text}
        </span>
      </div>
      {buttonContainer === "2" ? (
        <div className="button-container">
          <button
            type="button"
            className="modal-button"
            onClick={onClickButton1}
          >
            {button1}
          </button>
          <button
            type="button"
            className="modal-button"
            onClick={onClickButton2}
          >
            {button2}
          </button>
        </div>
      ) : buttonContainer === "1" ? (
        <div className="button-container">
          <button
            type="button"
            className="modal-button single"
            onClick={onClickButton1}
          >
            {button1}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ButtonModal;
