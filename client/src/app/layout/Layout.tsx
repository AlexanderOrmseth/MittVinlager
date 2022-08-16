import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <header className="w-full min-w-[320px] border-b bg-white px-2.5 py-4 dark:border-slate-800 dark:bg-black/10 sm:px-4 xl:px-0">
        <Header />
      </header>
      <main className="mx-auto flex w-full min-w-[320px] max-w-screen-xl grow flex-col px-2.5 pt-4 pb-12 sm:px-4 xl:px-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
