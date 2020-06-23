import React, { Component } from 'react'

export class CategoryCard extends Component {
  getStyle = (imgSrc) => {
    const style={
      backgroundImage: `url(${imgSrc})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    return style;
  }

  render() {
    const { imgSrc, name, onClick, className } = this.props;
    return (
      <div
        className={`category_card ${className}`}
        style={this.getStyle(imgSrc)}
        onClick={onClick}
      >
        <div className="category_card_text">{name}</div>
      </div>
    )
  }
}

export default CategoryCard
