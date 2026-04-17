import { useState } from 'react';
import { data } from '../Data/data.js';
import Card from '../components/Card';
import Button from '../components/Button';

function Home() {
  // all extensions data is stored here
  const [extensions, setExtensions] = useState(data);

  // filter state (all / active / inactive) that is current is stored here
  const [filter, setFilter] = useState('all');

  // globally tracks current selection state (buttons + cards share this)
  const [selected, setSelected] = useState({
    type: 'filter',
    value: 'all',
  });

  // Updates the current filter type
  function handleFilterChange(type) {
    setFilter(type);
  }

  // Returns filtered list of extensions based on current filter info
  function filterExtensions() {
    if (filter === 'active') {
      return extensions.filter(ext => ext.isActive);
    }

    if (filter === 'inactive') {
      return extensions.filter(ext => !ext.isActive);
    }

    // Default: return all extensions
    return extensions;
  }

  // Toggles active status of a specific extension
  function toggleExtension(id) {
    const updated = extensions.map(ext =>
      ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
    );

    setExtensions(updated);

    // Updates selected state to reflect card interaction
    setSelected({ type: 'card', value: id });
  }

  // Removes a specific extension from state based on its id by creating a new array that excludes the selected item
  function removeExtension(id) {
    const index = extensions.findIndex(ext => ext.id === id);

    const updated = extensions.filter(ext => ext.id !== id);
    setExtensions(updated);

// Updates the selected state after removal to ensure a valid card remains selected or resets to the default filter if no extensions are left   
 if (updated.length > 0) {
      const nextIndex =
        index >= updated.length ? updated.length - 1 : index;

      setSelected({
        type: 'card',
        value: updated[nextIndex].id,
      });
    } else {

    // Fallback option if no items/cards remain to "all" (upon refresh)
      setSelected({ type: 'filter', value: 'all' });
    }
  }

return (
  <div>
    {/* HEADER SECTION: Displays page title and filter controls/buttons */}
    <div className="header-container">
      <h1 className="title">Extensions List</h1>

      {/* Filter buttons allow user to switch between active, inactive, and see all states/extensions */}
      <div className="filter-buttons">
        <Button
          label="Active"
          onClick={() => {
            // Update filter to show only active extensions
            handleFilterChange('active');

            setSelected({ type: 'filter', value: 'active' });
          }}
          className={
            selected.type === 'filter' && selected.value === 'active'
              ? 'selected-button'
              : ''
          }
        />

        <Button
          label="Inactive"
          onClick={() => {
            // Updates filter to show only inactive extensions (when this button is clicked)
            handleFilterChange('inactive');

            // Updates selected state to visually highlight a button in question
            setSelected({ type: 'filter', value: 'inactive' });
          }}
          className={
            // Applies selected styling if a perticular filter is currently active
            selected.type === 'filter' && selected.value === 'inactive'
              ? 'selected-button'
              : ''
          }
        />

        <Button
          label="Show All"
          onClick={() => {
            // Resets filter to display all extensions
            handleFilterChange('all');

            // Updates selected state to visually highlight a button in question
            setSelected({ type: 'filter', value: 'all' });
          }}
          className={
            // Apply selected styling if a perticular filter is currently active
            selected.type === 'filter' && selected.value === 'all'
              ? 'selected-button'
              : ''
          }
        />
      </div>
    </div>

    {/* CARDS SECTION: Renders extension cards based on current filter */}
    <div className="cards-container">
      {filterExtensions().map(ext => (
        <Card
          key={ext.id} // Unique key for React rendering optimization (from class)
          id={ext.id}
          name={ext.name}
          description={ext.description}
          logo={ext.logo}
          isActive={ext.isActive}

          // Toggles active/inactive state of an extension
          toggleExtension={toggleExtension}

          // Function to remove an extension in question from the list
          removeExtension={removeExtension}

          // Global selection state for the current state of the card (used for UI highlighting)
          selected={selected}

          // Function to update selection state from within the card
          setSelected={setSelected}
        />
      ))}
    </div>
  </div>
);
}
export default Home;