import Switch from 'react-switch';

// Toggle switch component
// Controls active/inactive state of the extension of a card
function Toggle({ isActive, onToggle }) {
  return (
    <Switch
      onChange={onToggle}
      checked={isActive}
      onColor="#ee5f54"  // salmon - Active state color
      offColor="#a9a9a9" // soft gray - Inactive state color
      uncheckedIcon={false}
      checkedIcon={false}
      height={22}
      width={46}
    />
  );
}

export default Toggle;


