import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { CiWallet ,CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { FaCar, FaSearch } from "react-icons/fa";
import { RiTimerFlashLine } from "react-icons/ri";
import Navbar from './Navbar';
const Landing = () => {
    const router = useRouter();
    const [carModel, setCarModel] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carColor, setCarColor] = useState('');
    const [open, setOpen] = useState(false);
    
    const handleInputChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const queryParams = {
            model: encodeURIComponent(carModel),
            brand: encodeURIComponent(carBrand),
            year: encodeURIComponent(carYear),
            color: encodeURIComponent(carColor),
        };
        const queryString = new URLSearchParams(queryParams).toString();
        router.push(`/search/page?${queryString}`);
    };
    return (
        <div className="landing relative padding-container overflow-y-hidden">
            <Navbar open={open} setOpen={setOpen}/>
            <div className=" text-white main-prop max-container xs:h-full lg:h-[90vh] flex justify-center xs:flex-col lg:flex-row items-center">
                <div  data-aos="fade-right"> 
                    <h1 className="max-w-[80%] mb-10 text-[34px] font-bold">Now is the time to <span className='text-[var(--orange-color)]'>Rent</span> and <span className='text-[var(--orange-color)]'>drive</span> a new car. </h1>
                    <p className=' max-w-[70%] text-lg'>
                        This is the best platform for Rent and show cars where you can post ads for your used car,
                        Rent a new car, and even import any car to your country.
                    </p>
                </div>
                <form data-aos="fade-up" data-aos-delay="1000" onSubmit={handleSubmit} className={`xl:opacity-100 bg-[#f3f3f3] xs:w-[300px] sm:w-[600px] lg:w-[700px]  flex flex-col p-5 rounded-2xl items-center mt-10`}>
                    <p className='  text-xl text-[var(--blue-color)] font-bold my-4'>Hi, How We can Help you!</p>
                    <div className=' w-full  bg-[#e4e4e4] flex p-3 rounded-3xl '>
                    <p className=' text-xl font-bold text-red-600 mr-3 ml-1'><FaSearch/></p>
                        <input
                            id="car-name"
                            type="text"
                            name="car-name"
                            placeholder="Which model you search for?"
                            value={carModel}
                            onChange={handleInputChange(setCarModel)}
                            className=' w-full px-3 focus:outline-none bg-[#e4e4e4] mr-3'
                        />
                        
                    </div>
                    <div className=' w-full  bg-[#fff] flex p-3 rounded-3xl mt-3'>
                        <input
                            id="car-name"
                            type="text"
                            name="car-name"
                            placeholder="Which brand  you search for? "
                            value={carBrand}
                            onChange={handleInputChange(setCarBrand)}
                            className=' w-full  px-3 focus:outline-none bg-[#fff] mr-3'
                        />
                        <p  className=' text-xl font-bold text-blue-600 mr-3 ml-1'><FaSearch/></p>
                    </div>
                    <div className=' w-full  bg-[#e4e4e4] flex p-3 rounded-3xl mt-3'>
                    <p className=' text-xl font-bold  text-green-500 mr-3 ml-1 '><FaSearch/></p>
                        <input
                            id="car-name"
                            type="text"
                            name="car-name"
                            placeholder="Which year you search for?"
                            value={carYear}
                            onChange={handleInputChange(setCarYear)}
                            className=' w-full px-3 focus:outline-none bg-[#e4e4e4] mr-3'
                        />
                        
                    </div>
                    <div className=' w-full bg-[#fff] flex p-3 rounded-3xl mt-3'>
                        <input
                            id="car-name"
                            type="text"
                            name="car-name"
                            placeholder="Which color  you search for? "
                            value={carColor}
                            onChange={handleInputChange(setCarColor)}
                            className=' w-full px-3 focus:outline-none bg-[#fff] mr-3'
                        />
                        <p className=' text-xl font-bold text-orange-600 mr-3 ml-1'><FaSearch/></p>
                    </div>
                    <input type="submit"
                    value="search"
                    className=" w-full cursor-pointer text-lg  my-3 flex-center bg-[var(--blue-color)]   rounded-3xl border-none  py-3 text-white"
                />
                </form>
            </div>
        </div>
    )
}
export default Landing;