
import React, { useEffect, useState } from 'react'
import { FaUser, FaHeart } from 'react-icons/fa';
import { FaCar } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa6";
import { LuGauge } from "react-icons/lu";
import { CgDollar } from "react-icons/cg";
import { useStateContext, IStateContext } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loading from './Loading';
const Car = ({ car, index }: any) => {
    const router = useRouter();
    const { setCarDetail } = useStateContext() as IStateContext;
    const [carImage, setCarImage] = useState(null);
        
    useEffect(() => {
        const fetchCarImage = async () => {
            try {
                const response = await fetch(`http://rent2me.runasp.net/api/Car/${car.licencePlate}/image`);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                const imageURL:any = URL.createObjectURL(blob);
                setCarImage(imageURL); 
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        const timeout = setTimeout(fetchCarImage, 500); // Debounce the fetch operation

        return () => clearTimeout(timeout);
    }, [car.licencePlate]);
        if (!carImage ) {
            return <div className=''> <Loading text={"We are Loading Car..."} /> </div>; // Return loading indicator if car is not set yet
        }
    return (
        <div className="  bg-black  text-white rounded-lg" key={index} data-aos="fade-up">
            <div className="image h-[300px] overflow-hidden">
            <img src={carImage !==null?carImage:"/asset"} className='w-full h-full'  alt="Car" />
            </div>
            <div className="car-content ">
                <div className="car-name px-6 py-3 flex w-full items-center justify-between">
                    <h3 className=' text-2xl font-bold'>{car.model}</h3>
                    <span className=' border-2 border-[var(--orange-color)] rounded-3xl border-dotted px-6 py-3'>{car.year}</span>
                </div>
                <div className="car-details w-full grid grid-cols-2 px-3">
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <FaUser className=' inline font-bold text-[20px] text-[var(--orange-color)]' />
                        <span>{car.seatingCapacity} People</span>
                    </div>
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <FaCar className=' inline font-bold text-[20px] text-[var(--orange-color)]' />
                        <span>{car.carType}</span>
                    </div>
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <LuGauge className=' inline font-bold text-[20px] text-[var(--orange-color)]' />
                        <span>{car.currentMileage} Mile age</span>
                    </div>
                    <div className='p-3 text-lg flex items-center gap-3'>
                        <FaMicrochip className=' inline font-bold text-[20px] text-[var(--orange-color)]' />
                        <span>{car.color}</span>
                    </div>
                </div>
                <hr />
                <div className="car-price py-8 px-6 items-center flex justify-between">
                    <section className="flex gap-1 ">
                        <p className='text-[18px] font-bold '>{car.rentingPrice}</p>
                        <CgDollar className='font-bold text-[24px] text-[var(--orange-color)]' />
                    </section>
                    <div>
                        <button className='px-6 py-3 bg-[var(--orange-color)] rounded-3xl'
                            onClick={() => {
                                setCarDetail(car);
                                router.push(`/car/${car.licencePlate}`)
                                localStorage.setItem("carDetail", JSON.stringify(car));
                            }
                            }>
                            Rent Now
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Car