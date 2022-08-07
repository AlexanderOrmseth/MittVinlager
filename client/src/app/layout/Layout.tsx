import { GithubLogo, LinkedinLogo } from "phosphor-react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <header className="w-full min-w-[320px] border-b bg-white p-4 dark:border-slate-800 dark:bg-black/10 xl:px-0">
        <Header />
      </header>
      <main className="mx-auto flex w-full min-w-[320px] max-w-screen-xl grow flex-col px-4 pt-4 pb-12 xl:px-0">
        <Outlet />
      </main>
      <footer className="relative mx-auto w-full min-w-[320px] max-w-screen-xl border-t py-8 px-4 dark:border-gray-700 xl:px-0">
        <div className="flex  flex-col items-center justify-around gap-4 md:flex-row">
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/AlexanderOrmseth/MittVinlager"
              target="_blank"
              className="flex items-center gap-x-1 rounded border-white bg-gray-900 px-2 py-1 text-white hover:bg-black dark:bg-black/60 dark:hover:bg-black"
              rel="noreferrer"
            >
              <GithubLogo size="1.5rem" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-ormseth-731b11239/"
              target="_blank"
              className="flex items-center gap-x-1 rounded border-white bg-[#0a66c2] px-2 py-1  text-white hover:bg-[#004182]"
              rel="noreferrer"
            >
              <LinkedinLogo size="1.5rem" />
              LinkedIn
            </a>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Utviklet av Alexander Ormseth
          </p>
        </div>
        <p className="absolute left-0 -top-2.5 w-full text-center text-sm text-gray-500 dark:text-gray-400">
          <span className="bg-white px-2 dark:bg-gray-900">
            Mitt Vinlager © 2021-{new Date().getFullYear()}
          </span>
        </p>
      </footer>
    </>
  );
};

export default Layout;
