import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { navItems } from "../Constant/index";
import AOS from  "aos"

const Navbar = ({ open, setOpen }: any) => {
    const [user, setUser] = useState('');


    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000, 
            delay: 200 
        });
        

        // Function to get data from local storage
        const getDataFromLocalStorage = () => {
            const localStorageData = localStorage.getItem('user');
            if (localStorageData) {
                setUser(localStorageData);
            }
        }
        getDataFromLocalStorage();
        return () => {
        };
    }, []);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <header className=' relative z-10 ' data-aos="fade-down">
            <div className="max-container py-2 border-b-[1px] border-[var(--med-gray-color)]">
                <nav className=' flex items-center justify-between'>
                    <Link href={"/"} className='w-[150px]'>
                        <img className='w-full' src='/asset/logo (2).png' alt='' />
                    </Link>
                    <div className={`navbar-links justify-center items-center gap-5  text-lg text-white xs:hidden xl:flex ${open ? "active " : ""}`}>
                        <ul className='flex xs:flex-col xl:flex-row  gap-5 py-5 text-lg text-white'>
                            {navItems.map((item: any, index: number) => (
                                <li key={index} className=' transition-all hover:text-[var(--orange-color)]'>
                                    <Link href={item.href}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                        {user ? (
                            <Link href="/profile/page ">
                                <FaUser />
                            </Link>
                        ) : (
                            <div className={`flex gap-5`}>
                                <Link className="px-6 py-3 text-white bg-[var(--orange-color)] rounded-xl" href="/login/page">
                                    Log in
                                </Link>
                                <Link className="px-6 py-3 text-white bg-[var(--orange-color)] rounded-xl" href="/signUp/page">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    <button onClick={() => handleOpen()} type='button' title='button' className={`xl:hidden text-[24px] px-3 py-3 text-white bg-[var(--orange-color)] transition-all rounded-xl ${open ? "hidden " : "block"}`}><IoMdMenu /></button>
                    <button onClick={() => handleClose()} type='button' title='button' className={`xl:hidden text-[24px] px-3 py-3 text-white bg-[var(--orange-color)] rounded-xl transition-all ${open ? "block" : "hidden"}`}><IoMdClose /></button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
