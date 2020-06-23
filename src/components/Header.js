import React from 'react'

export const Header = ({ header, children }) => (
  <div className="header">
    <div className="header_content grid_left">
      {header}
    </div>
    <div className="grid_right">
      {children}
    </div>
  </div>
);