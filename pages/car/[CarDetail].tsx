import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { useStateContext, IStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import { Contract } from 'ethers';
import { FaTimesCircle, FaPlaceOfWorship, FaImage } from "react-icons/fa"
import React, { useEffect, useState } from 'react'
import RequestForm from '@/components/RequestForm';
import AOS from "aos"
const CarDetail = () => {
    const [carImage, setCarImage] = useState(null);
    const [rentClicked, setRentClicked] = useState(false);

    const { carDetail, setCarDetail, user, setUser } = useStateContext() as IStateContext;

    useEffect(() => {

        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if (userJson !== null) {
                const localStorageData = JSON.parse(userJson);
                setUser(localStorageData);
            }
            const carJson = localStorage.getItem('carDetail');
            if (carJson !== null) {
                const localStorageData = JSON.parse(carJson);
                setCarDetail(localStorageData);
                const savedImageURL: any = localStorage.getItem('carImage');
                if (savedImageURL) {
                    setCarImage(savedImageURL);
                }
            } else {
                console.error('Car data not found in local storage.');
            }
        };
        getDataFromLocalStorage();
    }, []); // This effect runs only once on mount to get data from local storage

    useEffect(() => {
        const fetchCarImage = async () => {
            if (!carDetail || !carDetail.licencePlate) {
                return; // Exit early if carDetail or licencePlate is undefined
            }
            try {
                const response = await fetch(`http://rent2me.runasp.net/api/Car/${carDetail.licencePlate}/image`);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                const imageURL: any = URL.createObjectURL(blob);
                setCarImage(imageURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchCarImage();
    }, [carDetail]);

    const handleDownload = async () => {
        try {
            const response = await fetch('http://rent2me.runasp.net/api/Contract/contract/?requestId=1');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'contract_image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up the temporary link element
        } catch (error) {
            console.error('Error downloading contract:', error);
        }
    };
    if (!carDetail || !carImage) {
        return <div className='min-h-[100vh]'> <Loading text={"We are Loading Car Details..."} /> </div>; // Return loading indicator if carDetail is not set yet
    }

    return (
        <div className='bg-[var(--dark-gray-color)]'>
            <div className='max-container padding-container  md:max-h-[100vh] xs:h-full overflow-hidden'>
                <Navbar />
                <div className=' main-prop  relative text-black  text-xl font-bold'>
                    <div className='flex md:flex-row xs:flex-col justify-center gap-10'>
                        <div >
                            <div className=' h-[600px]  overflow-hidden'>
                                <img src={carImage !== null ? carImage : "../"} className='h-full w-full overflow-hidden' alt="Car" />
                            </div>
                        </div>
                        <div className="car-details flex-1  my-10">
                            <div className="w-full h-full grid  ">
                                <div>
                                    <span className=" text-[var(--blue-color)] text-[30px] font-bold">  {carDetail.model} </span>
                                </div>

                                <div className=' mt-10 mb-5  text-[var(--orange-color)] text-2xl'>All car details</div>
                                <div>
                                    <label>Car Brand: </label>
                                    <span className="brand" >{carDetail.brand}</span>
                                </div>

                                <div>
                                    <label>year: </label>
                                    <span className="year">{carDetail.year}</span>
                                </div>
                                <div>
                                    <label>Color: </label>
                                    <span className="color">{carDetail.color}</span>
                                </div>
                                <div>
                                    <label>License Plate: </label>
                                    <span className="NOD">{carDetail.licencePlate}</span>
                                </div>
                                <div>
                                    <label>Mileage </label>
                                    <span className="mile">{carDetail.currentMileage}</span>
                                </div>
                                <div>
                                    <label>Fuel Type: </label>
                                    <span className="fuel-type">{carDetail.fuelType}</span>
                                </div>
                                <div>
                                    <label>seating capacity: </label>
                                    <span className="seats-num">{carDetail.seatingCapacity}</span>
                                </div>
                                <div className=' flex gap-5 md:justify-self-end text-lg  xs:justify-self-auto'>
                                    <button onClick={() => setRentClicked(true)} type="button" className=' text-nowrap mt-10 px-6 py-3 rounded-2xl bg-white text-[var(--blue-color)]'>Rent it Now</button>
                                    <button type='button' onClick={handleDownload} className='text-nowrap cursor-pointer mt-10 px-6 py-3 rounded-2xl bg-[var(--blue-color)] text-white'> Download Contract</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {rentClicked &&
                    <div data-aos="zoom-in" className='bg-[#000000ad] absolute top-0 left-0 w-full h-full z-30 '>
                        <div  className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                            <RequestForm user={user} carDetail={carDetail} setRentClicked={setRentClicked} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CarDetail;
