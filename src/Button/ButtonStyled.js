import styled from 'styled-components';

export const InputStyled = styled.input`
  color: inherit;
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
  margin: 1rem auto 0 auto;
  display: block;
  border: 1px solid black;
  color: black;
  padding: .75rem 1.5rem;
  border-radius: .3rem;
  text-align: center;
  :active {
  }
`;
