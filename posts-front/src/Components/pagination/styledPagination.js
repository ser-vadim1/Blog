import styled from "styled-components"
import {device} from "../../GlobalStyle/BreakPoints"
export const UlPager = styled.ul`
display: flex;
width: 600px;
  list-style-position: none;
  margin: 0;
  margin-top: 10px;
  padding: 0px;
justify-content: center;
`

export const LiPager = styled.li`
&:nth-child(1){
   margin-right: 10px;
}
&:last-child{
   margin-left: 10px;
}
 list-style-type: none;
 `

export const ButtonPage = styled.button`
outline: none;
display: flex;
justify-content: center;
align-items: center;
width: 15px;
height: 15px;
border: 1px solid black;
margin-left: 2px;
color: ${({isActive})=> isActive ? "White" :""};
/* font-family: 'Amatic SC', cursive; */
font-weight: bold;
font-size: 1em;
background-color: ${({isActive})=> isActive ? "#4457fc" : "white"};
cursor: pointer;

@media ${device.mobileL}{
   width: 40px;
height: 40px;

}
`


