import { GithubLogo, LinkedinLogo } from "phosphor-react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <header className="py-4 bg-white dark:bg-black/10 dark:border-slate-800 border-b w-full min-w-[320px] px-4 xl:px-0">
        <Header />
      </header>
      <main className="flex-grow flex flex-col w-full max-w-screen-xl min-w-[320px] pt-4 pb-12 mx-auto px-4 xl:px-0">
        <Outlet />
      </main>
      <footer className="py-8 relative w-full max-w-screen-xl min-w-[320px] mx-auto px-4 border-t dark:border-gray-700 xl:px-0">
        <div className="flex flex-row gap-4 justify-around items-center">
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/AlexanderOrmseth/MittVinlager"
              target="_blank"
              className="bg-gray-900 dark:bg-black/60 dark:hover:bg-black hover:bg-black text-white rounded-full px-3 flex items-center gap-x-1 border-white py-1"
              rel="noreferrer"
            >
              <GithubLogo size="1.5rem" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-ormseth-731b11239/"
              target="_blank"
              className="bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full px-3 flex items-center gap-x-1  border-white py-1"
              rel="noreferrer"
            >
              <LinkedinLogo size="1.5rem" />
              LinkedIn
            </a>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Utviklet av Alexander Ormseth
          </p>
        </div>
        <p className="text-center absolute left-0 -top-2.5 text-gray-500 dark:text-gray-400 text-sm w-full">
          <span className="bg-white dark:bg-gray-900 px-2">
            Mitt Vinlager © 2021-{new Date().getFullYear()}
          </span>
        </p>
      </footer>
    </>
  );
};

export default Layout;
