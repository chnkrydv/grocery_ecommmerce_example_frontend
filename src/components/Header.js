import React from 'react'

export const Header = ({ header, children }) => (
  <div className="header">
    <div>{header}</div>
    {children}
  </div>
);