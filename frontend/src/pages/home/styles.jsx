import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center;
  height: 90vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */

  @media (max-width: 1024px) {
    height: 80vh; /* Adjust height for medium screens */
  }

  @media (max-width: 768px) {
    height: 70vh; /* Adjust height for small screens */
  }

  @media (max-width: 480px) {
    height: 60vh; /* Adjust height for extra small screens */
  }
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center;
  height: 90vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */

  @media (max-width: 1024px) {
    height: 80vh; /* Adjust height for medium screens */
  }

  @media (max-width: 768px) {
    height: 70vh; /* Adjust height for small screens */
  }

  @media (max-width: 480px) {
    height: 60vh; /* Adjust height for extra small screens */
  }
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

  @media (max-width: 1024px) {
    width: 95%; /* Adjust width for medium screens */
    height: 85%; /* Adjust height for medium screens */
  }

  @media (max-width: 768px) {
    width: 100%; /* Adjust width for small screens */
    height: 80%; /* Adjust height for small screens */
  }

  @media (max-width: 480px) {
    width: 100%; /* Adjust width for extra small screens */
    height: 75%; /* Adjust height for extra small screens */
  }
`;