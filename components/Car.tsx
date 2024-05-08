
import React, { useEffect, useState } from 'react'
import { urlFor } from '@/lib/client';
import Link from 'next/link';
import { FaUser, FaHeart } from 'react-icons/fa';
import { FaCar } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa6";
import { LuGauge } from "react-icons/lu";
import { CgDollar } from "react-icons/cg";
import CarDetail from './CarDetail';
const Car = ({ car, index }: any) => {
    const [details, setDetails] = useState(false)
    useEffect(() => {
        if (details) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [details]);
    return (
        <div className="  bg-black rounded-lg" key={index}  data-aos="fade-up">
            <div className="image h-[300px] overflow-hidden">
                <img className='w-full h-full ' src={`${urlFor(car.image)}`} alt="" />
            </div>
            <div className="car-content ">
                <div className="car-name px-6 py-3 flex w-full items-center justify-between">
                    <h3 className=' text-2xl font-bold'>{car.carModel}</h3>
                    <span className=' border-2 border-[var(--orange-color)] rounded-3xl border-dotted px-6 py-3'>{car.year}</span>
                </div>
                <div className="car-details w-full grid grid-cols-2 px-3">
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <FaUser className=' inline font-bold text-[20px] text-[var(--orange-color)]'/>
                        <span>{car.seatNum} People</span>
                    </div>
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <FaCar className=' inline font-bold text-[20px] text-[var(--orange-color)]'/>
                        <span>{car.carType}</span>
                    </div>
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <LuGauge className=' inline font-bold text-[20px] text-[var(--orange-color)]' />
                        <span>{car.mileage} Mile age</span>
                    </div>
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <FaMicrochip className=' inline font-bold text-[20px] text-[var(--orange-color)]' />
                        <span>{car.fuelType}</span>
                    </div>
                </div>
                <hr />
                <div className="car-price py-8 px-6 items-center flex justify-between">
                    <section className="flex gap-1 ">
                        <p className='text-[18px] font-bold '>{car.rentingPrice}</p> 
                        <CgDollar className='font-bold text-[24px] text-[var(--orange-color)]'/>
                    </section>
                    <div>
                        <button className='px-6 py-3 bg-[var(--orange-color)] rounded-3xl' onClick={() => setDetails(true)}>Rent Now</button>
                    </div>
                </div>
            </div>
            {details &&
            <div className='fixed bg-black z-40 top-0 right-0 xs:min-w-full' >
                <CarDetail car={car} setDetails={setDetails} />
            </div>
        }
        </div>

    )
}
export default Car