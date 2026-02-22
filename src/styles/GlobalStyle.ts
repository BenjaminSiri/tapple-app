import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  :root {
    --color-primary:rgb(29, 133, 185);
    --color-secondary: rgb(121, 173, 126);
    --color-tertiary: rgb(255, 144, 144);
    --background:rgb(255, 255, 255);
    --text-primary: rgb(33, 33, 33);
    --text-secondary: rgb(217, 217, 217);
    --color-warning: rgb(255, 82, 82);
  }
`;

export default GlobalStyle;