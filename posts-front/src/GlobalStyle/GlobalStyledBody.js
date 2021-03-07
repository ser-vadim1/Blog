import { createGlobalStyle } from 'styled-components'
import {device} from "./BreakPoints"
export const GlobalStyle = createGlobalStyle`
html {
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
 }
 *, *:after, *:before {
    -webkit-box-sizing: inherit;
      box-sizing: inherit;
 }
  body {
    height: 100%;
    margin: 0;
    font-family: "Akaya Telivigala, serif";
    overflow-x: hidden;
  }
`