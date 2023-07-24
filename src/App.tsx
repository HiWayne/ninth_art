import { Suspense } from "react";
import AppRouter, { AppRoutes, routes } from "router/index";
import { createGlobalStyle } from "styled-components";
import Loading from "./shared/components/Loading";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  :root {
    --pUV7hA: #0d1216;
  }
  @keyframes shaking {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter>
        <Suspense fallback={<Loading />}>
          <AppRoutes routes={routes}></AppRoutes>
        </Suspense>
      </AppRouter>
    </>
  );
}

export default App;
