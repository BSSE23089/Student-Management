const Button = ({ text, onClick, className }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {text}
  </button>
);
export default Button;
