import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const TRStyled = styled.tr`
  border-bottom: 1px solid gray;
`;

const TDStyled = styled.td`
  font-family: sans-serif;
  color: darkslategray;
  padding: 1rem;
`;

const NumberInput = ({ label, func, value }) => (
  <TRStyled>
    <TDStyled>
      {label}
    </TDStyled>
    <TDStyled>
      <InputStyled
        onClick={({ currentTarget }) => currentTarget.select()}
        onChange={func}
        size="4"
        value={value}
      />
    </TDStyled>
  </TRStyled>
);

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

const TableStyled = styled.table`
 margin-left: auto;
 margin-right: auto;
 margin-bottom: 2rem;
 border-collapse: collapse;
`;

const MultipleInputs = ({ configs }) => (
  <TableStyled>
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
  </TableStyled>
);

MultipleInputs.propTypes = {
  configs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    func: PropTypes.func.isRequired,
  })).isRequired,
};


export default MultipleInputs;
