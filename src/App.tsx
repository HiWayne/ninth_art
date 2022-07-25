import AppRouter, { AppRoutes, routes } from "router/index";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter>
        <AppRoutes routes={routes}></AppRoutes>
      </AppRouter>
    </>
  );
}

export default App;
