import React from 'react'

export default function CloseButton({onClick}) {
  return (
    <div className="white_button" onClick={onClick}>
      <div className="close_icon">+</div>
    </div>
  );
}
