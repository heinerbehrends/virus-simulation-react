import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './ButtonStyled';

const Button = ({ value }) => (
  <ButtonStyled
    type="button"
    readOnly
    autoFocus
    value={value}
  />
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Button;
