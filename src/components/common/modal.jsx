const ButtonModal = ({ text, buttonContainer, button1, button2, onClick }) => {
  return (
    <div className="modal-container">
      <div className="text-container">
        <span className="modal-text">{text}</span>
      </div>
      {buttonContainer === "2" ? (
        <div className="button-container">
          <button type="button" className="modal-button" onClick={onClick}>
            {button1}
          </button>
          <button type="button" className="modal-button" onClick={onClick}>
            {button2}
          </button>
        </div>
      ) : buttonContainer === "1" ? (
        <div className="button-container">
          <button type="button" className="modal-button" onClick={onClick}>
            {button1}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ButtonModal;
