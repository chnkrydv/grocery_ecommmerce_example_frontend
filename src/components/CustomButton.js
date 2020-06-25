import React from 'react'

export const CustomButton = ({text, onClick}) => (
  <div className="button" onClick={onClick}>{text}</div>
);