
// Reusable button component
// Used for filters and card actions
function Button({ onClick, label, className = '' }) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export default Button;