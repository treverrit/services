import styled from "styled-components"

export const NavbarDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
position: fixed;
top: 0;
left: 0;
right: 0;
@media screen and (max-width: 500px){
    height: 4rem;
}
`

export const NavbarLinks = styled.div`
display: flex;
flex-direction: row;
justify-content: end;
align-items: center;
`

export const LeftSide = styled.div`
width: 200px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

@media screen and (max-width: 800px) {
    width: 150px;
}
`