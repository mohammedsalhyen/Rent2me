"use client"
import React, { useState } from 'react'
import Lottie from "lottie-react";
import contact from "../public/animation/contact.json";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = () => {
        const distinationMail = 'mrent2me@gmail.com';
        window.location.href = `mailto:${distinationMail}?subject=${encodeURIComponent(name), encodeURIComponent(email)}&body=${encodeURIComponent(message)}`;
    };
    return (
        <div className='main-prop ' id='Contact'>
            <div className='max-container padding-container flex justify-center relative py-20 bg-[var(--blue-color)] xs:h-full lg:h-[110vh] overflow-hidden'>
                <div className=' flex gap-10 justify-around items-center xs:flex-col lg:flex-row xs:w-full md:w-5/6 h-full'>
                    <div className='relative flex-1 z-10 pb-20' >
                        <Lottie animationData={contact} loop={true} />
                    </div>
                    <div className='form-container relative  xs:w-[350px] md:w-[500px] ' >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-[var(--dark-gray-color)] to-[var(--med-gray-color)] shadow-lg transform -rotate-6 rounded-3xl">
                            </div>
                            <div className="relative py-10 px-8 bg-white shadow-lg rounded-3xl">
                                <p className='text-[32px] text-[var(--orange-color)] font-bold mb-10 text-center text-nowrap'>Contact Info</p>
                                <form className='flex flex-col mx-auto xs:w-[300px] md:w-[450px] ' onSubmit={handleSubmit}>
                                    <div className='flex  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]'>
                                        <input
                                            type='text'
                                            title='name'
                                            required onChange={(e) => { setName(e.target.value) }}
                                            placeholder='Your name'
                                            className='text-black focus:outline-none w-full bg-inherit'
                                        />
                                    </div>
                                    <div className='flex  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]'>
                                        <input
                                            type='email'
                                            title='email'
                                            placeholder='Your Email'
                                            required onChange={(e) => setEmail(e.target.value)}
                                            className='text-black focus:outline-none w-full bg-inherit'
                                        />
                                    </div>
                                    <div className='flex  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]'>
                                        <textarea
                                            name='message'
                                            title='message'
                                            placeholder='Your message'
                                            onChange={(e) => setMessage(e.target.value)}
                                            className='text-black focus:outline-none w-full bg-inherit max-h-[150px]'
                                        ></textarea>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Let's Talk!"
                                        className=' cursor-pointer bg-[var(--orange-color)] rounded-5xl border-none py-3 ' />
                                </form>
                            </div>

                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact

