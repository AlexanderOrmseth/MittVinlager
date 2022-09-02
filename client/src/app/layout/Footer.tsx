import { GithubLogo, LinkedinLogo } from "phosphor-react";

const Footer = () => {
  return (
    <footer className="relative mx-auto w-full min-w-[320px] max-w-screen-xl border-t py-12 px-2.5 dark:border-gray-700 sm:px-4 md:py-8 xl:px-0">
      <div className="flex flex-col items-center justify-around gap-x-4 gap-y-6 md:flex-row">
        <div className="xts:text-sm flex flex-wrap gap-4 text-xs">
          <a
            href="https://github.com/AlexanderOrmseth/MittVinlager"
            target="_blank"
            className="flex items-center gap-x-1 rounded border-white bg-gray-900 px-2 py-1 text-white hover:bg-black dark:bg-black/60 dark:hover:bg-black"
            rel="noreferrer"
          >
            <GithubLogo size="1.5em" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/alexander-ormseth/"
            target="_blank"
            className="flex items-center gap-x-1 rounded border-white bg-[#0a66c2] px-2 py-1  text-white hover:bg-[#004182]"
            rel="noreferrer"
          >
            <LinkedinLogo size="1.5em" />
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
  );
};

export default Footer;
