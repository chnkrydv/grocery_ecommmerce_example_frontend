import React from 'react'

export const Header = ({ header, large=true, children }) => (
  <div className="header">
    <div className={`header_content grid_left ${large ? 'text_size_30' : 'text_size_24'}`}>
      {header}
    </div>
    <div className="grid_right">
      {children}
    </div>
  </div>
);