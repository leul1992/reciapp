import React from "react";
import useHelper from "../ShowRecipe/showOrHide";
import useAuth from "../Authenticate/authenticate";
import logo from '../assets/logo.jpg';
import { Link } from "react-router-dom";
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
  } from "@material-tailwind/react";

import {
    PlusIcon,
    HomeIcon,
    CogIcon,
    Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

function Header() {
    const {details, showFavourite, hideDetail, hideFavourite} = useHelper();
    const { authentication, logout } = useAuth();

    const showFavouriteHandler = () => {
        if (details.showDetail){
            hideDetail();
        }
        showFavourite();
    }
    function gotohome() {
        hideDetail();
        hideFavourite();
    }
    const handleLogout = () => {
        logout();
      };
    return(
        <>
            {authentication.isLoggedIn && 
            <header className="fixed z-50 flex w-full bg-[#F2F4F3] shadow-lg items-center justify-between h-14">
                <div 
                className="py-1 px-1 ml-4 cursor-pointer rounded-xl bg-stone-200"
                onClick={gotohome}
                >
                    <span className="text-[#2de336] hover:text-[#34d53ca8] font-medium">ReciApp</span>
                </div>
                <div className="flex gap-6">
                    <div
                    onClick={showFavouriteHandler}
                    className="hidden sm:flex text-xl text-[#265F71] font-medium border-b-2 border-b-[#2de336] cursor-pointer hover:text-[#268F71]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      <span>Favourites</span>
                    </div>
                    <Link to='/about_developer'
                    className="hidden sm:flex text-xl text-[#265F71] font-medium border-b-2 border-b-[#2de336] cursor-pointer hover:text-[#268F71]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      <span>About</span>
                    </Link>
                </div>
                <div className="h-80">
      <div className="absolute bottom-2 right-6">
        <SpeedDial className="bg-red-400">
          <SpeedDialHandler>
            <IconButton className="bg-green-400 hover:bg-green-900">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="bg-[#F2F4F3]">
            <SpeedDialAction onClick={gotohome}>
              <HomeIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction
            onClick={showFavouriteHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </SpeedDialAction>
            <SpeedDialAction>
                <Link to='/about_developer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </Link>
            </SpeedDialAction>
            <SpeedDialAction
            className="bg-[#F2F4F3]"
            onClick={handleLogout}>
            <h4 className="font-semibold">LogOut</h4>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
            </header>
}
        </>
    );
}

export default Header;