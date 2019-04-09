import React from 'react';
import PropTypes from 'prop-types';
import { curry } from 'ramda';
import { InputStyled } from '../Button/ButtonStyled';

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
  <tr style={{ borderBottom: '1px solid grey' }}>
    <td style={{ padding: '1rem' }}>
      {label}
    </td>
    <td style={{ padding: '1rem' }}>
      <InputStyled
        onClick={({ currentTarget }) => currentTarget.select()}
        onChange={func}
        size="4"
        value={value}
      />
    </td>
  </tr>
);

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const MultipleInputs = ({ configs }) => (
  <table style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
    {configs.map(
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
    )}
  </table>
);

MultipleInputs.propTypes = {
  configs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    func: PropTypes.func.isRequired,
  })).isRequired,
};


export default MultipleInputs;
