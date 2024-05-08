import React, {  useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import {runFireworks} from '../utils/data';

const Success = () => {
    useEffect(() => {
        runFireworks();
    }, []);
    return (
        <div className="search-bg min-h-[100vh] flex-center">
            <div className=" flex-center flex-col bg-[#000] rounded-2xl p-10 text-[#FFF] text-center ">
                <div className="w-[100px]">
                    <img src='/asset/success.png'  alt=""/>
                </div>
                <h2 className=' text-xl mt-5'>Thank you for your upgrade</h2>
                <p className=' text-lg mt-1'>Check your email inbox for the receipt.</p>
                <p  className=' text-lg mt-1'>
                    If you have any questions, please email 
                    <a  className=' text-[var(--orange-color)]' href="mailto:order@example.com">
                         rent2me@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" className="py-3 px-6 mt-3 text-lg rounded-3xl  bg-[var(--orange-color)] ">
                        Back to Home Page
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success