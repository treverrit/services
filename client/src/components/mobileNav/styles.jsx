import styled from "styled-components"

export const MobileNavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 98%;
  display: ${props => props.click ? "flex" : "none"};
  flex-direction: column;
  justify-content: center;
  align-items: left;
  z-index: 3;
  transition: all ease 0.3s;
  top: 4rem;
  left: 0;
  right: 0;
`;

export const Separator = styled.div`
width: 80%;
height: 2px;
margin: 2rem 0;
background: linear-gradient(122deg, rgba(73,219,198,1) 0%, rgba(111,45,213,1) 35%, rgba(227,0,255,1) 100%);
transform: ${props => props.click ? "scale(1, 1)" : "scale(0, 1)"};
transition: all ease 0.3s;
`