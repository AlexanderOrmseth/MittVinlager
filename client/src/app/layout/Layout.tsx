import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <header className="py-4 bg-white border-b w-full border px-4 xl:px-0">
        <Header />
      </header>
      <main className="flex-grow w-full max-w-screen-xl py-4 mx-auto px-4 xl:px-0">
        <Outlet />
      </main>
      <footer className="py-4 w-full max-w-screen-xl mx-auto px-4 xl:px-0">
        <p className="text-center">Alexander Ormseth</p>
      </footer>
    </>
  );
};

export default Layout;
