import AppRouter, { AppRoutes, routes } from "router/index";

function App() {
  return (
    <AppRouter>
      <AppRoutes routes={routes}></AppRoutes>
    </AppRouter>
  );
}

export default App;
