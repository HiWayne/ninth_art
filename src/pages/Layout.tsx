import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => (
  <div className="h-[100%]">
    <nav></nav>
    <main className="h-[100%]">
      <Outlet />
    </main>
  </div>
);

export default Layout;
