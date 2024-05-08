"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { CiWallet ,CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { FaCar, FaSearch } from "react-icons/fa";
import { RiTimerFlashLine } from "react-icons/ri";
import Navbar from './Navbar';
const Landing = () => {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    
    const handleInputChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.push(`/search/page?input=${encodeURIComponent(input)}`);
    };
    return (
        <div className="landing relative padding-container overflow-y-hidden">
            <Navbar open={open} setOpen={setOpen}/>
            <div className='overlay'></div>
            <div className="   main-prop max-container xs:h-full lg:h-[90vh] flex justify-center xs:flex-col lg:flex-row items-center z-10 relative ">
                <div className={`${open?" opacity-0":" opacity-100"} xl:opacity-100`} data-aos="fade-right"> 
                    <h1 className="max-w-[80%] mb-10 text-[34px] font-bold">Now is the time to <span className='text-[var(--orange-color)]'>Rent</span> and <span className='text-[var(--orange-color)]'>drive</span> a new car. </h1>
                    <p className=' max-w-[70%] text-lg'>
                        This is the best platform for Rent and show cars where you can post ads for your used car,
                        Rent a new car, and even import any car to your country.
                    </p>
                </div>
                <form data-aos="fade-up" data-aos-delay="1000" onSubmit={handleSubmit} className={`${open?" md:opacity-0":" opacity-100"} xl:opacity-100 bg-[#989898]  flex flex-col p-5 rounded-2xl items-center mt-10`}>
                    <p className='  text-xl font-bold my-4'>Hi, How We can Help you!</p>
                    <div className=' xs:w-full md:w-[80%] bg-[#fff] flex p-3 rounded-lg'>
                        <input
                            id="car-name"
                            type="text"
                            name="car-name"
                            placeholder="Pleace Enter Model ,Brand or Color of Car"
                            required
                            value={input}
                            onChange={handleInputChange(setInput)}
                            className=' w-full focus:outline-none bg-[#fff] mr-3'
                        />
                        <button title='button' type='submit' className=' rounded-lg p-3 bg-[var(--orange-color)]'><FaSearch/></button>
                    </div>
                    <div className='search-icons-contaner'>
                        <div>
                            <CiWallet/>
                            <p>Save Money</p>
                            </div>
                        <div>
                            <CiDeliveryTruck/>
                            <p>Delivery</p>
                        </div>
                        <div>
                            <MdOutlinePayment/>
                            <p>Easy Payment</p>
                            </div>
                        <div>
                            <FaCar/>
                            <p>Amazing Car</p>
                            </div>
                        <div>
                            <RiTimerFlashLine/>
                            <p>Support 24h</p>
                            </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Landing
