import React from 'react'

const CustomButton = ({ title }) => {
  return (
    <button 
    className={`px-2`}
    >
      {title}
    </button>
  )
}

export default CustomButton