import { GithubLogo, LinkedinLogo } from "phosphor-react";
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
      <footer className="py-8 relative w-full max-w-screen-xl mx-auto px-4 border-t xl:px-0">
        <div className="flex flex-row gap-4 justify-around items-center">
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/AlexanderOrmseth/MittVinlager"
              className="bg-gray-900 hover:bg-black text-white rounded flex items-center gap-x-1  border-white py-1 px-2"
            >
              <GithubLogo size="1.5rem" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-ormseth-731b11239/"
              target="_blank"
              className="bg-[#0a66c2] hover:bg-[#004182] text-white rounded flex items-center gap-x-1  border-white py-1 px-2"
              rel="noreferrer"
            >
              <LinkedinLogo size="1.5rem" />
              LinkedIn
            </a>
          </div>
          <p className="text-gray-700 text-sm">Utviklet av Alexander Ormseth</p>
        </div>
        <p className="text-center absolute left-0 -top-2.5 text-gray-500 text-sm w-full">
          <span className="bg-white px-2">Mitt Vinlager © 2021</span>
        </p>
      </footer>
    </>
  );
};

export default Layout;
