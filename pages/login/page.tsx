"use client"
import React, { useEffect, useState } from 'react'
import { FaLock, FaUser } from "react-icons/fa";

import AOS from "aos"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStateContext, IStateContext } from '@/context/StateContext';
const page = () => {
    const { user, setUser } = useStateContext() as IStateContext;
    const router = useRouter();
    const [nationalID, setNationalID] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
    }, []);
    const handleSignInChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };

    {/*const handleLoginSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const query = userQuery(nationalID);
            const userData = await client.fetch(query)
                .then((dataArray) => {
                    const data = dataArray[0];
                    if (data._id === nationalID && data.password === password) {
                        localStorage.setItem("user", JSON.stringify(data));
                        setUser(data)
                        console.log(user)
                        router.push("/");
                    } else {
                        alert("password or national id is wrong")
                    }
                });
        } catch (error) {
            // Handle fetch error
            console.error('Error:', error);
        }
    };*/}
    const handleLoginSubmit = async (event: any) => {
        event.preventDefault();
        const formData = {
            NationalID: nationalID,
            Password: password
        };

        try {
            const response = await fetch('http://rent2me.runasp.net/api/Login/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("user", JSON.stringify(responseData));
                setUser(responseData)
                router.push("/");
                console.log('Login successful:', responseData);
            } else {
                console.error('Login failed:', response.statusText);
                if (response.status === 400) {
                    console.error('Bad request');
                } else if (response.status === 401) {
                    console.error('Unauthorized');
                } else {
                    console.error('Unexpected error');
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    return (
        <div className='bg-[var(--blue-color)] flex-center h-[100vh] overflow-hidden'>
            <div className='flex h-[90%] w-[80%] bg-white rounded-xl overflow-hidden '>
                <div className=" xs:hidden sm:flex w-3/5 padding-container login-bg  flex-col justify-center text-start">
                    <p data-aos="fade-in" className='text-[28px] font-bold'>Rent2Me</p>
                    <p data-aos="fade-in" data-aos-delay="800" className='text-xl py-5'>The most popular website to rent modern car</p>
                    <Link href={"/"} data-aos="fade-up" data-aos-delay="900" type='button' title='button'
                        className='bg-[var(--orange-color)] rounded-3xl px-6 py-3 w-fit  '
                    >
                        Go Now
                    </Link>

                </div>
                <div data-aos="fade-left" data-aos-delay="1100" className=' flex flex-col justify-center px-8'>
                    <p className='text-[32px] font-bold text-black'>Hello again !</p>
                    <p className='text-[24px] text-black'>Welcome Back</p>
                    <form onSubmit={handleLoginSubmit}>
                        <div className=" flex mt-8  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaUser />
                            <input
                                id="ssn-signIn"
                                type="number"
                                max="99999999999999"
                                name="SSN"
                                value={nationalID}
                                onChange={handleSignInChange(setNationalID)}
                                placeholder=" National ID"
                                required
                                className='text-black w-full focus:outline-none bg-inherit'
                            />
                            <span id="ssn-error"></span>
                        </div>
                        <div className=" flex mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaLock />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleSignInChange(setPassword)}
                                placeholder=" password"
                                required
                                className='text-black w-full focus:outline-none bg-inherit'
                            />
                        </div>
                        <input type="submit"
                            value={"Login"}
                            className=" w-full cursor-pointer  mb-3 flex-center bg-[var(--orange-color)]  border-[1px] rounded-3xl border-none gap-1 py-3 text-white"
                        />
                        <a href="#" className=" block  p-3 text-[#a9a9a9]">Forgot your password?</a>
                        <a href="/signUp/page" className="  mb-3 p-3 text-[var(--orange-color)]">Don't have account?</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
