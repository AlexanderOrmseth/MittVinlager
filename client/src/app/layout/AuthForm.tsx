import {LockKey} from "phosphor-react";
import React from "react";
interface Props {
  title: string;
  children: React.ReactNode;
}
const AuthForm = ({title, children}: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800/30 dark:border-gray-700 shadow-lg border rounded-lg max-w-xl mx-auto px-8 pt-6 pb-8 mb-4 w-full flex flex-col">
      <header className="flex items-center justify-center mb-4 pb-4 border-b dark:border-gray-700">
        <LockKey
          size={"2.25rem"}
          className="text-slate-600 dark:text-gray-300 mr-3"
        />
        <h2 className="text-3xl  text-center">{title}</h2>
      </header>
      {children}
    </div>
  );
};

export default AuthForm;
