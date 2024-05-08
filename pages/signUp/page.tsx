"use client"
import React, { useEffect, useState } from 'react'
import { FaLock, FaUser, FaPhone, FaImage, FaAddressBook } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import AOS from "aos"
import { client } from '@/lib/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const page = () => {
    const router = useRouter();
    const [nationalID, setNationalID] = useState('');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
    }, []);
    const handleSignUpChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = {
            NationalID: nationalID,
            Name: name,
            Address: address,
            Phone: phone,
            Mail: mail,
            Password: password,
            ConfirmPassword: confirmPassword,

        };
        try {
            console.log(formData);
            const response = await fetch('ftp://rent2me.somee.com/api/Register/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Register successful:', responseData);
                console.log(formData);
                alert("true")
            }
            else {
                console.error('Register failed:', response.statusText);
                console.log(formData);
                alert("false")
                if (response.status === 400) {
                    console.error('Bad request');
                } else if (response.status === 401) {
                    console.error('Unauthorized');
                } else {
                    console.error('Unexpected error');
                }
            }
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='bg-[var(--blue-color)] flex-center xs:h-full  md:h-[100vh] overflow-hidden'>
            <div className='flex h-[90%] w-[80%] bg-white rounded-xl overflow-hidden '>
                <div className=" xs:hidden sm:flex w-1/3 px-5 login-bg  flex-col justify-center text-start">
                    <p data-aos="fade-in" className='text-[28px] font-bold'>Rent2Me</p>
                    <p data-aos="fade-in" data-aos-delay="800" className='text-xl py-5'>The most popular website to rent modern car</p>
                    <Link href={"/"} data-aos="fade-up" data-aos-delay="900" type='button' title='button'
                        className='bg-[var(--orange-color)] rounded-3xl px-6 py-3 w-fit  '
                    >
                        Go Now
                    </Link>

                </div>
                <div data-aos="fade-left" data-aos-delay="1100" className=' flex flex-col justify-center px-8'>
                    <p className='text-[32px] mb-8 font-bold text-black'>Welcome to Rent2Me</p>
                    <form onSubmit={handleSubmit} className='grid xs:grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaUser />

                            <input
                                id="ssn-signUp"
                                type="number"
                                max="99999999999999"
                                value={nationalID}
                                onChange={handleSignUpChange(setNationalID)}
                                name="nationalID"
                                placeholder="Your SSN"
                                required
                                className='text-black focus:outline-none w-full bg-inherit'
                            />

                        </div>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <MdDriveFileRenameOutline />
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={name}
                                onChange={handleSignUpChange(setName)}
                                required
                                className='text-black focus:outline-none w-full bg-inherit'
                            />
                        </div>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaLock />
                            <input
                                id="pass1"
                                type="password"
                                name="password"
                                placeholder="Your password"
                                required
                                value={password}
                                onChange={handleSignUpChange(setPassword)}
                                className='text-black focus:outline-none w-full bg-inherit'
                            />
                        </div>
                        <div className=" flex  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaLock />
                            <input
                                id="pass2"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                required
                                value={confirmPassword}
                                onChange={handleSignUpChange(setConfirmPassword)}
                                className='text-black focus:outline-none w-full bg-inherit'
                            />
                            {/*errors.password2 && <span className="error">{errors.password2}</span>*/}
                        </div>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaPhone />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone"
                                value={phone}
                                onChange={handleSignUpChange(setPhone)}
                                required
                                className='text-black focus:outline-none w-full bg-inherit'
                            />
                        </div>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <MdEmail />
                            <input
                                type="email"
                                name="mail"
                                placeholder="Your Mail"
                                value={mail}
                                onChange={handleSignUpChange(setMail)}
                                required
                                className='text-black focus:outline-none w-full bg-inherit'
                            />
                        </div>
                        <div className=" flex  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaAddressBook />
                            <input
                                type="text"
                                name="address"
                                placeholder="Your Address"
                                value={address}
                                onChange={handleSignUpChange(setAddress)}
                                className='text-black focus:outline-none w-full bg-inherit'
                            />
                        </div>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaImage className=' text-xl' />
                            <p className=' ml-2 text-nowrap'>Upload your Image</p>
                            <input
                                type="file"
                                id="uploadBtn_Photo"
                                name="Photo"
                                multiple
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                
                                className=' opacity-0'
                            />

                        </div>
                        <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                            <FaImage className=' text-xl' />
                            <p className=' ml-2 text-nowrap'> your Driving License</p>
                            <input
                                type="file"
                                id="uploadBtn_drivingLicense"
                                name="Photo"
                                multiple
                                accept="image/*"
                                onChange={(e) => setDrivingLicense(e.target.files[0])}
                                
                                className=' opacity-0'
                            />

                        </div>
                        <input type="submit"
                            value={"Sign Up"}
                            className=" w-full cursor-pointer  mb-3 flex-center bg-[var(--orange-color)]  border-[1px] rounded-3xl border-none gap-1 py-3 text-white"
                        />
                    </form>
                    <Link href="/login/page" className="  mb-3 p-3 text-[var(--orange-color)]">already have account?</Link>
                </div>
            </div>
        </div>
    )
}

export default page
