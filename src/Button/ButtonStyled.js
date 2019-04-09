import styled from 'styled-components';

export const InputStyled = styled.input`
  display: inline;
  vertical-align: middle;
  border-width: 0px;
  @media screen and (min-width: 445px) {
    font-size: 1.1rem;
  };
  :focus {
    outline: 0;
  }
`;

export const ButtonStyled = styled(InputStyled)`
  border-radius: .3rem;
  text-align: center;
  :active {
  }
`;
