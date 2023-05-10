import styled from "styled-components";

type Types = {};

export const WelcomeContainer = styled.div`
  background-image: url("sky.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: radial-gradient(
    closest-side,
    #33052b8c,
    #000000c2,
    #000000f5,
    #000000
  );
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: white;
`;
