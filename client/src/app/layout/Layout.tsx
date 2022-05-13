import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <header className="py-4 border-b border px-4 xl:px-0">
        <Header />
      </header>
      <main className="max-w-screen-xl mx-auto mt-4 px-4 xl:px-0">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
