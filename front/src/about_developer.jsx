import React from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaGithub, FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa';

export default function About_developer() {
    return (
        <div className="p-5 flex flex-col">
            <Link to='/'>
                <div  className='border-2 w-10 flex items-center justify-center text-gray-700 hover:text-white bg-blue-gray-200 rounded-l-3xl hover:bg-blue-gray-500'><FaAngleLeft size='30' /></div>
            </Link>
            <div className='border-4 bg-orange-400 text-white self-center flex flex-col rounded-xl border-blue-gray-300 items-center justify-center py-10 mx-10 md:mx-0 w-full md:w-1/2 my-10'>
                <span className="font-bold">Leulseged Bekele Ayalew - Aspiring Software Engineer</span>
                <div className="flex gap-2">
                    <Link to="https://www.linkedin.com/in/leulseged-ayalew-352a461a0/" target="_blank" rel="noopener noreferrer" className="text-indigo-400"><FaLinkedin size={30} /></Link>
                    <Link to="https://github.com/leul1992" target="_blank" rel="noopener noreferrer" className="text-gray-700"><FaGithub size={30} /></Link>
                    <Link to="https://twitter.com/leulbekele192"  target="_blank" rel="noopener noreferrer" className="text-blue-500"><FaTwitter size={30} /></Link>
                    <Link to="https://t.me/Leulbkm" target="_blank" rel="noopener noreferrer" className="text-[#0088CC]"><FaTelegram size={30} /></Link>
                </div>
            </div>
        </div>
    )
}