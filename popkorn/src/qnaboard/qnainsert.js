
function Qnainsert({ onClose}) {
  return (
    <div className="qnainsert-backdrop">
      <div className="qnainsert-content">
        <button onClick={onClose}>Close</button>
        this is content
      </div>
    </div>
  );
}

export default Qnainsert;
