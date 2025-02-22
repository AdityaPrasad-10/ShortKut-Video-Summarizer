import React from "react";


const NavBar: React.FC = () => {

  return (
    <>
      <nav className="">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8">
          <span className="self-center logoText text-2xl font-semibold whitespace-nowrap dark:text-white">
            Short Kut
          </span>
          
        </div>
      </nav>
    </>
  );
};

export default NavBar;