import React from 'react'

export const HomePage = ({products}) => (<div>
  {products.map(item => (<li>{item}</li>))}
</div>);