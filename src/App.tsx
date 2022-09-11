import { Suspense } from "react";
import AppRouter, { AppRoutes, routes } from "router/index";
import { createGlobalStyle } from "styled-components";
import Loading from "./shared/components/Loading";

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
        <Suspense fallback={<Loading />}>
          <AppRoutes routes={routes}></AppRoutes>
        </Suspense>
      </AppRouter>
    </>
  );
}

export default App;
