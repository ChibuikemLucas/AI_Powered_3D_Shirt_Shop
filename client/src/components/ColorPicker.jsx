import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store'; // Ensure you're importing the correct state file

const ColorPicker = () => {
  const snap = useSnapshot(state);

  const handleColorChange = (color) => {
    if (color.hex) {
      state.color = color.hex; // Safely update the color state
    }
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color} // Bind the picker to the current color state
        disableAlpha
        onChange={handleColorChange} // Use a function for updates
      />
    </div>
  );
};

export default ColorPicker;
