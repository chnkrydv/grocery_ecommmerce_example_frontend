import React from 'react'

export const HomePage = ({groceries}) => (<div>
  {groceries.map(item => (<li>{item}</li>))}
</div>);