"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import type { Session } from "next-auth";

import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

type SideBarProps = {
  session: Session | null;
};
export const SideBar = ({ session }: SideBarProps) => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  // const { data: session } = useSession();
  const handleClickLogout = () => {
    logout();
    closeSideMenu();
  };

  const isAutheticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="">
      {isSideMenuOpen && (
        <>
          {/* background back*/}
          <div className="fixed top-0 left-0 w-full h-screen z-10 bg-black opacity-30" />
          {/* Blur */}
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={closeSideMenu}
          />
        </>
      )}

      {/* side menu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200  focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* menu */}
        {isAutheticated && (
          <>
            <Link
              href="/profile"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil </span>
            </Link>
            <Link
              href="/orders"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes </span>
            </Link>
          </>
        )}

        {!isAutheticated ? (
          <Link
            href="/auth/login"
            onClick={closeSideMenu}
            className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar </span>
          </Link>
        ) : (
          <button
            onClick={handleClickLogout}
            className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all w-full"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir </span>
          </button>
        )}

        {isAdmin && (
          <>
            {/* line separator */}
            <div className="w-full h-px my-10 bg-gray-200 " />

            <Link
              href="/admin/products"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos </span>
            </Link>
            <Link
              href="/admin/order"
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all"
              onClick={closeSideMenu}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes </span>
            </Link>
            <Link
              href="/admin/users"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios </span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
