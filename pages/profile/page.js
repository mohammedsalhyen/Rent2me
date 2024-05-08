"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FaUserEdit } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
const page = () => {
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
        // Function to get data from local storage
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if (userJson !== null) {
                const localStorageData = JSON.parse(userJson);
                setUser(localStorageData);
            }
        }
        getDataFromLocalStorage();
    }, []);
    const handleLogout = () => {
        localStorage.clear()
        router.push("/")
    }
    return (
        <div className='  profile-bg min-h-[100vh]'>
            <div className="max-container padding-container text-[var(--blue-color)]">
                <div className='w-full flex justify-between items-center py-7'>
                    <Link href={"/"} className='w-[150px]'  >
                        <img className=' w-full' src='/asset/logo (2).png' alt='' />
                    </Link>
                    <div className='text-red-700 font-bold bg-white py-4 px-8 border-none rounded-3xl flex-center gap-2' >
                        <button onClick={() => handleLogout()}>Logout</button>
                        <IoMdLogOut />
                    </div>
                </div>
                <div className="content flex-center flex-col text-center">
                    <div className='w-[250px]  border-2 border-[var(--orange-color)] overflow-hidden rounded-full '>
                        <img className='w-full' src={"/asset/man.png"} id="Photo" alt='profile' />
                    </div>
                    <div className="details">
                        <section className="name">
                            <div className=" text-[34px] font-bold text-[var(--blue-color)]">{user?.name}</div>
                        </section>
                        <section className="email">
                            <div id="mail" className="text-[22px] mt-3">{user?.mail}</div>
                        </section>
                        <div className='flex-center xs:flex-col sm:flex-row gap-3 mt-10 text-white'>
                            <div className=" bg-[#b7b7b7] p-2 rounded-lg">{user?.nationalID}</div>
                            <div className="bg-[#b7b7b7] p-2 rounded-lg">{user?.address}</div>
                            <div className="bg-[#b7b7b7] p-2 rounded-lg">{user?.phone}</div>
                        </div>
                    </div>
                    <div className='text-white mt-5 bg-[var(--orange-color)] rounded-3xl py-3  px-6 border-none flex-center gap-2 '>
                        <FaUserEdit />
                        <button >Edit</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default page

