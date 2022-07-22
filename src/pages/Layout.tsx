import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => (
  <div>
    <nav></nav>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
