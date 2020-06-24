import React, { Component } from 'react'

export class CategoryCard extends Component {
  getStyle = (imageSource) => {
    const style={
      backgroundImage: `url(${imageSource})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    return style;
  }

  render() {
    const { imageSource, name, totalProducts, onClick, className } = this.props;
    return (
      <div
        className={`category_card ${className}`}
        style={this.getStyle(imageSource)}
        onClick={onClick}
      >
        <div className="category_card_text">
          <div className="grid_left">{name}</div>
          <div className="grid_right">{totalProducts}</div>
        </div>
      </div>
    )
  }
}

export default CategoryCard
