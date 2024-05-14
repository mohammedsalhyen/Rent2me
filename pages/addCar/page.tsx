"use client"
import React, { useEffect, useState } from 'react'
import { GrLicense } from "react-icons/gr";
import { TbBrandElectronicArts } from "react-icons/tb";
import { IoLogoModelS, IoMdTime, IoIosColorPalette } from "react-icons/io";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { MdOutlineAirlineSeatReclineExtra, MdOutlinePriceCheck } from "react-icons/md"
import { RiPinDistanceFill } from "react-icons/ri";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import AOS from "aos"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStateContext, IStateContext } from '@/context/StateContext';
const page = () => {
    const router = useRouter();
    const { user, setUser } = useStateContext() as IStateContext;
    // State to manage form data
    const [licensePlate, setLicensePlate] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carType, setCarType] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [seatNum, setSeatNum] = useState("");
    const [mileage, setMileage] = useState("");
    const [deposite, setDeposite] = useState("");
    const [rentingPrice, setRentingPrice] = useState("");
    const [image, setImage]:any = useState(null);
    const [propertyDeed, setPropertyDeed]:any = useState(null);
    useEffect(() => {
        // Function to get data from local storage
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if (userJson !== null) {
                const localStorageData = JSON.parse(userJson);
                if (localStorageData.hasOwnProperty('nationalID')) {
                    setUser(localStorageData);
                } else {
                    console.error('User data in local storage is missing the nationalid property.');
                }
            } else {
                console.error('User data not found in local storage.');
            }
        }
        getDataFromLocalStorage();

        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
    }, []);

    const handleInputChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };



    const onFileChange = (setter: any) => (e: any) => {
        setter(e.target.files[0]);
    };





    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('LicencePlate', licensePlate);
        formData.append('CarType', carType);
        formData.append('Brand', carBrand);
        formData.append('Color', color);
        formData.append('CurrentMileage', mileage);
        formData.append('Year', year);
        formData.append('Model', carModel);
        formData.append('Image', image);
        formData.append('SeatingCapacity', seatNum);
        formData.append('RentingPrice', rentingPrice);
        formData.append('Deposite', deposite);
        formData.append('PropertyDeed', propertyDeed);
        formData.append('UserrID', user.nationalID);
        

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            const response = await fetch('http://rent2me.runasp.net/api/Car/AddCar' , {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Added successful:', responseData);
                router.push("/");
            } else {
                const responseData = await response.json();
                console.log('Added failed:', responseData);
                console.error('Adding is failed:', response.statusText);
                alert("false");
                
                if (response.status === 400) {
                    console.error('Bad request');
                } else if (response.status === 401) {
                    console.error('Unauthorized');
                } else {
                    console.error('Unexpected error');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className=' bg-[var(--blue-color)] flex-center xs:h-full  md:h-[100vh] overflow-hidden'>
            <div className='flex h-[90%] w-[80%] bg-white rounded-xl overflow-hidden '>
                <div className=" xs:hidden sm:flex text-white w-1/3 px-5 login-bg  flex-col justify-center text-start">
                    <p data-aos="fade-in" className='text-[28px] font-bold'>Rent2Me</p>
                    <p data-aos="fade-in" data-aos-delay="800" className='text-xl py-5'>The most popular website to rent modern car</p>
                    <Link href={"/"} data-aos="fade-up" data-aos-delay="900" type='button' title='button'
                        className='bg-[var(--orange-color)] rounded-3xl px-6 py-3 w-fit  '
                    >
                        Go Now
                    </Link>

                </div>
                <div data-aos="fade-left" data-aos-delay="1100" className=' flex flex-col justify-center px-8'>
                    <p className='text-[32px] mb-8 font-bold text-black'>Add your car</p>
                    <form onSubmit={handleSubmit}>
                        <div className="add-car grid xs:grid-cols-1 md:grid-cols-2 gap-5 text-[#a9a9a9]">
                            <div>
                                <GrLicense />
                                <input
                                    type="text"
                                    name="licensePlate"
                                    value={licensePlate}
                                    onChange={handleInputChange(setLicensePlate)}
                                    placeholder="Enter Your License Number"
                                    className='text-black w-full focus:outline-none bg-inherit'
                                />
                            </div>
                            <div>
                                <MdOutlinePriceCheck />
                                <input
                                    id="rentingPrice"
                                    type="text"
                                    name="rentingPrice"
                                    value={rentingPrice}
                                    onChange={handleInputChange(setRentingPrice)}
                                    placeholder="Enter Your renting Price"
                                    required
                                    className='text-black w-full focus:outline-none bg-inherit'
                                />
                            </div>
                            <div>
                                <VscTypeHierarchySub />
                                <input
                                    id="carType"
                                    type="text"
                                    name="carType"
                                    value={carType}
                                    onChange={handleInputChange(setCarType)}
                                    placeholder="Enter Your Car Type"
                                    className='text-black w-full focus:outline-none bg-inherit'
                                />
                            </div>
                            <div>
                                <TbBrandElectronicArts />
                                <select
                                    name="carBrand"
                                    id="brand"
                                    value={carBrand}
                                    onChange={handleInputChange(setCarBrand)}
                                    className='text-black w-full focus:outline-none bg-inherit'
                                    required>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Ford">Ford</option>
                                    <option value="Chevrolet">Chevrolet</option>
                                    <option value="BMW">
                                        BMW (Bayerische Motoren Werke)
                                    </option>
                                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                                    <option value="Audi">Audi</option>
                                    <option value="Volkswagen">Volkswagen</option>
                                    <option value="Tesla">Tesla</option>
                                    <option value="Nissan">Nissan</option>
                                    <option value="Hyundai">Hyundai</option>
                                    <option value="Kia">Kia</option>
                                    <option value="Subaru">Subaru</option>
                                    <option value="Porsche">Porsche</option>
                                    <option value="Ferrari">Ferrari</option>
                                    <option value="Lamborghini">Lamborghini</option>
                                    <option value="Aston Martin">Aston Martin</option>
                                    <option value="Jaguar">Jaguar</option>
                                    <option value="Land Rover">Land Rover</option>
                                    <option value="Rolls-Royce">Rolls-Royce</option>
                                </select>
                            </div>
                            <div>
                                <IoLogoModelS />
                                <select
                                    name="carModel"
                                    id="model"
                                    value={carModel}
                                    onChange={handleInputChange(setCarModel)}
                                    className='text-black w-full focus:outline-none bg-inherit'
                                    required>
                                    <optgroup label="Sedans">
                                        <option value="Toyota_Camry">Toyota Camry</option>
                                        <option value="Honda_Accord">Honda Accord</option>
                                        <option value="BMW_3_Series">BMW 3 Series</option>
                                        <option value="Mercedes-Benz_E-Class">
                                            Mercedes-Benz E-Class
                                        </option>
                                    </optgroup>
                                    <optgroup label="SUVs (Sport Utility Vehicles):">
                                        <option value="Ford_Explorer">Ford Explorer</option>
                                        <option value="Toyota_RAV4">Toyota RAV4</option>
                                        <option value="Jeep_Grand_Cherokee">
                                            Jeep Grand Cherokee
                                        </option>
                                        <option value="BMW_X5">BMW X5</option>
                                    </optgroup>
                                    <optgroup label="Trucks">
                                        <option value="Ford_F-150">Ford F-150</option>
                                        <option value="Chevrolet_Silverado">
                                            Chevrolet Silverado
                                        </option>
                                        <option value="Toyota_Tacoma">Toyota Tacoma</option>
                                        <option value="Ram_1500">Ram 1500</option>
                                    </optgroup>
                                    <optgroup label="Hatchbacks">
                                        <option value="Volkswagen_Golf">
                                            Volkswagen Golf
                                        </option>
                                        <option value="Ford_Fiesta">Ford Fiesta</option>
                                        <option value="Honda_Fit">Honda Fit</option>
                                        <option value="Mazda3">Mazda3</option>
                                    </optgroup>
                                    <optgroup label="Coupes">
                                        <option value="Ford_Mustang">Ford Mustang</option>
                                        <option value="Chevrolet_Camaro">
                                            Chevrolet Camaro
                                        </option>
                                        <option value="Audi_A5">Audi A5</option>
                                        <option value="BMW_4_Series">BMW 4 Series</option>
                                    </optgroup>
                                    <optgroup label="Electric Vehicles (EVs):">
                                        <option value="Tesla_Model S">Tesla Model S</option>
                                        <option value="Nissan_Leaf">Nissan Leaf</option>
                                        <option value="Chevrolet_Bolt_EV">
                                            Chevrolet Bolt EV
                                        </option>
                                        <option value="Audi_e-tron">Audi e-tron</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div>
                                <IoMdTime />
                                <input
                                    id="year"
                                    type="number"
                                    name="year"
                                    value={year}
                                    className='text-black w-full focus:outline-none bg-inherit'
                                    onChange={handleInputChange(setYear)}
                                    placeholder="Car Year"
                                    required
                                />
                            </div>
                            <div>
                                <IoIosColorPalette />
                                <input
                                    id="color"
                                    type="string"
                                    name="color"
                                    value={color}
                                    className='text-black w-full focus:outline-none bg-inherit'
                                    onChange={handleInputChange(setColor)}
                                    placeholder="Enter Car Color"
                                    required
                                />
                            </div>
                            <div>
                                <IoIosColorPalette />
                                <input
                                    id="deposite"
                                    type="string"
                                    name="deposite"
                                    value={deposite}
                                    className='text-black w-full focus:outline-none bg-inherit'
                                    onChange={handleInputChange(setDeposite)}
                                    placeholder="Enter Deposite"
                                    required
                                />
                            </div>
                            <div>
                                <MdOutlineAirlineSeatReclineExtra />
                                <input
                                    id="seat_num"
                                    type="number"
                                    name="seatNum"
                                    value={seatNum}
                                    onChange={handleInputChange(setSeatNum)}
                                    placeholder="Enter Number of Seats"
                                    min="2"
                                    max="10"
                                    required
                                    className='text-black w-full focus:outline-none bg-inherit'
                                />
                            </div>
                            <div>
                                <RiPinDistanceFill />
                                <input
                                    id="mileage"
                                    type="number"
                                    name="mileage"
                                    value={mileage}
                                    onChange={handleInputChange(setMileage)}
                                    placeholder="Enter Distances traveled"
                                    step="0.01"
                                    className='text-black w-full focus:outline-none bg-inherit'
                                />
                            </div>
                            <div className='text-[#a9a9a9]'>
                                <FaImage />
                                <label className='text-nowrap' htmlFor="uploadBtn_Photo">Upload Photos</label>
                                <input
                                    type="file"
                                    id="uploadBtn_Photo"
                                    name="Photo"
                                    multiple
                                    accept="image/*"
                                    onChange={onFileChange(setImage)}
                                    required
                                    className=' opacity-0'
                                />

                            </div>
                            <div className='text-[#a9a9a9]'>
                                <FaImage />
                                <label className=' text-nowrap ' htmlFor="uploadBtn_Property">Upload Property Deed</label>
                                <input
                                    type="file"
                                    id="uploadBtn_Property"
                                    name="Photo"
                                    multiple
                                    accept="image/*"
                                    onChange={onFileChange(setPropertyDeed)}
                                    required
                                    className=' opacity-0'
                                />
                            </div>
                            <input type="submit"
                                className=" w-full cursor-pointer  mb-3 flex-center bg-[var(--orange-color)]  border-[1px] rounded-3xl border-none gap-1 py-3 text-white"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
