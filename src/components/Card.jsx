import Toggle from './Toggle';
import Button from './Button';

function Card({
  id,
  name,
  description,
  logo,
  isActive,
  toggleExtension,
  removeExtension,
  selected,
  setSelected,
}) {
  // Determines if THIS card is currently selected
  const isSelected =
    selected.type === 'card' && selected.value === id;

  return (
    <div className="card">
      {/* TOP SECTION: displays logo and description  */}
      <div className="card-top">
        <img src={logo} alt={`${name} logo`} />

        <div>
          <h3>{name}</h3>
          <p className="description">{description}</p>
        </div>
      </div>

      {/* BOTTOM SECTION: allows for actions (remove & toggle) */}
      <div className="card-bottom">
        <Button
          label="Remove"
          onClick={() => {
            // set selection BEFORE card in question removal
            setSelected({ type: 'card', value: id });
            removeExtension(id);
          }}
          className={`remove-button ${
            isSelected ? 'selected-button' : ''
          }`}
        />

        <Toggle
          isActive={isActive}
          onToggle={() => {
            // Toggle active state of extension
            toggleExtension(id);
            // Updates selection state of the card
            setSelected({ type: 'card', value: id });
          }}
        />
      </div>
    </div>
  );
}

export default Card;