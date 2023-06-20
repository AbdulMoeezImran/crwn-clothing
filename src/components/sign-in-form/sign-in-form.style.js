import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  @media screen and (max-width: 800px) {
    display: unset;
    flex-direction: unset;
    padding: 100;
  }

  h2 {
    margin: 10px 0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    width: 350px;
    justify-content: unset;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`;