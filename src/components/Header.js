import React from 'react'

export const Header = ({ header, onHeaderClick, large = true, children }) => (
  <div className="header">
    <div className="header_bounded">
      <div
        className={`
        header_content
        grid_left
        ${large ? 'text_size_30' : 'text_size_24'} 
        ${onHeaderClick ? 'clickable' : ''}
      `}
        onClick={onHeaderClick}
      >
        {header}
      </div>
      <div className="grid_right">
        {children}
      </div>
    </div>
  </div>
);

export default Header;