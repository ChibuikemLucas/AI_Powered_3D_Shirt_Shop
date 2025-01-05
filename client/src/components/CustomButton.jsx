import React from 'react';
import state from '../store';
import { useSnapshot } from 'valtio';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color || '#000', // Default color fallback
        color: '#fff',
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color || '#000', // Default color fallback
        color: snap.color || '#000',
      };
    }
    return {}; // Default style if type doesn't match
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
