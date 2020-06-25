import React, { Fragment } from 'react'

const IfElse = ({
  condition,
  ifComponent,
  elseComponent,
}) => (
  <Fragment>
    {condition ? ifComponent : elseComponent}
  </Fragment>
);

export default IfElse;