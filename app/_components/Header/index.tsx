"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex lg:justify-between justify-between items-center 2xl:px-40 xl:px-32 lg:px-24 pr-4 py-2">
      <div className="p-6 lg:p-2 xl:w-[260px] lg:[220px] w-[180px]">
        <Image src={logo} alt="Logo" />
      </div>
      <button
        className="lg:hidden p-2 border rounded-md"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:block absolute lg:relative top-24 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none z-10`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-0">
          <li>
            <a href="#" className="block lg:inline hover:font-semibold text-main text-lg">
              Sobre
            </a>
          </li>
          <li>
            <a href="#" className="block lg:inline hover:font-semibold text-main text-lg">
              Contato
            </a>
          </li>
          <li>
            <a href="#" className="block lg:inline hover:font-semibold text-main text-lg">
              Estoque
            </a>
          </li>
          <li>
            <a href="#" className="block lg:inline hover:font-semibold text-main text-lg">
              Anunciar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
