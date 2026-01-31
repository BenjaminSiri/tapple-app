import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { RootStoreProvider } from './stores/RootStore';
import GameArea from './components/GameArea';

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {

  return (
    <RootStoreProvider>
      <GlobalStyle />
      <StyledApp>
        <GameArea />
      </StyledApp>
    </RootStoreProvider>
  )
}

export default App
