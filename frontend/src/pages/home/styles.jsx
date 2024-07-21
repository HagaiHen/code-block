import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center;
  height: 90vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
`;

export const Card = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  background-color: #aaaaaa;
  border-radius: 10px;
`;