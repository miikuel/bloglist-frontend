const Notification = ({ errorMessage, messageColor }) => (
  <div style={{ color: messageColor }}>
    {errorMessage}
  </div>
)

export default Notification