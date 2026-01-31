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
    --background:rgb(255, 255, 255);
    --text-primary: rgb(33, 33, 33);
    --text-secondary: rgb(117, 117, 117);
    --color-warning: rgb(255, 82, 82);
  }
`;

export default GlobalStyle;