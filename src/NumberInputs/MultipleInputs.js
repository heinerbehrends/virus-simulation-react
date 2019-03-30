import React from 'react';
import { curry } from 'ramda';
import { TextInput } from '../ScreenName/ScreenNameStyled';

const handleNrInput = curry(
  ({ setFunc, max }, { target: { value } }) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      return;
    }
    if (number < 1) {
      setFunc(1);
      return;
    };
    if (number > max) {
      setFunc(max);
      return;
    };
    setFunc(number);
  }
);

const NumberInput = ({ label, func, value }) => (
  <div style={{display: "flex", justifyContent: "space-between"}}>
    <span style={{marginLeft: "2rem"}} >{label}</span>
    <TextInput onClick={({ currentTarget }) => currentTarget.select()} onChange={func} size="4" value={value}/>
  </div>
);

const MultipleInputs = ({ configs }) => (
  configs.map(
    ({ label, func, max, value }, idx) => (
      <NumberInput
        label={label}
        func={handleNrInput({setFunc: func, max})}
        value={value}
        key={idx}
      />
    ),
  )
);

export default MultipleInputs;
