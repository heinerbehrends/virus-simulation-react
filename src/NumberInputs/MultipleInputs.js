import React from 'react';
import PropTypes from 'prop-types';
import { curry } from 'ramda';
import { TextInput } from '../ScreenName/ScreenNameStyled';

const handleNrInput = curry(
  ({ setFunc, max }, { target: { value } }) => {
    const number = parseInt(value, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (number < 1) {
      setFunc(1);
      return;
    }
    if (number > max) {
      setFunc(max);
      return;
    }
    setFunc(number);
  },
);

const NumberInput = ({ label, func, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ marginLeft: '2rem' }}>
      {label}
    </span>
    <TextInput
      onClick={({ currentTarget }) => currentTarget.select()}
      onChange={func}
      size="4"
      value={value}
    />
  </div>
);

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const MultipleInputs = ({ configs }) => (
  configs.map(
    ({
      label,
      func,
      max,
      value,
    }, idx) => (
      <NumberInput
        label={label}
        func={handleNrInput({ setFunc: func, max })}
        value={value}
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
      />
    ),
  )
);

export default MultipleInputs;
