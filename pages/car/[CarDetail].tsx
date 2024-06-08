
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { useStateContext, IStateContext } from '@/context/StateContext';
import React, { useEffect, useState } from 'react'
import RequestForm from '@/components/RequestForm';
import AOS from "aos"
import Link from 'next/link';
import { handleFeedBack, fetchFeedBacks } from "@/utils/data"
import { useRouter } from 'next/navigation';
const CarDetail = () => {
    const router = useRouter();
    const [carImage, setCarImage] = useState(null);
    const [userImage, setUserImage] = useState("");
    const [message, setMessage] = useState("");
    const [feedbacks, setFeedBacks]: any = useState([]);
    const [rentClicked, setRentClicked] = useState(false);
    const { carDetail, setCarDetail, user, setUser } = useStateContext() as IStateContext;
    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
        const fetchUserImage = async (userId: number) => {
            try {
                const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}/image`);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                const imageURL: any = URL.createObjectURL(blob);
                setUserImage(imageURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if (userJson !== null) {
                const localStorageData = JSON.parse(userJson);
                setUser(localStorageData);
                fetchUserImage(localStorageData.nationalID)
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
                const data: any = await fetchFeedBacks(carDetail.userrID, carDetail.licencePlate)
                setFeedBacks(data);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchCarImage();
    }, [carDetail]);
    const handleDownload = async () => {
        try {
            const response = await fetch('http://rent2me.runasp.net/api/Contract/SystemContract/?contractId=1');
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
        return <div className='min-h-[100vh] flex-center'> <Loading text={"We are Loading Car Details..."} /> </div>; // Return loading indicator if carDetail is not set yet
    }
    return (
        <div className=' bg-[#EEE]'>
            <div className='max-container padding-container   xs:h-full '>
                <div className=' main-prop  relative text-black   font-bold'>
                    <div className='flex md:flex-row xs:flex-col justify-center gap-10 p-10 rounded-3xl bg-[#fff]'>
                        <div className='flex-1' >
                            <div className=' h-[600px] w-full overflow-hidden'>
                                <img src={carImage !== null ? carImage : "../"} className='h-full w-full overflow-hidden' alt="Car" />
                            </div>
                        </div>
                        <div className="car-details flex-1 ">
                            <div>
                                <span className=" text-[var(--blue-color)] text-[30px] font-bold">  {carDetail.model} </span>
                            </div>
                            <div className=' mt-10 mb-5  text-[var(--orange-color)] text-2xl'>All car details</div>
                            <div className="w-full  grid grid-cols-2 text-[#00000087] text-[16px]">
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
                            </div>
                            <div className=' flex gap-5 my-5 text-[16px]'>
                                <button onClick={() => setRentClicked(true)} type="button" className=' text-nowrap  px-4 py-1 rounded-3xl text-white bg-[var(--blue-color)]'>Rent it Now</button>
                                <button type='button' onClick={handleDownload} className='text-nowrap cursor-pointer  px-4 py-1 rounded-3xl bg-[var(--blue-color)] text-white'> Download Contract</button>
                            </div>
                            <div>
                                <p className='text-xl mb-5'>FeedBacks</p>
                                <div className=' max-h-[150px] overflow-y-scroll overflow-x-hidden'>
                                    {
                                        feedbacks?.map((feedback: any, index: number) => (
                                            <div key={index} className='flex items-center my-3 gap-x-4'>
                                                <div className=' h-[40px] w-[40px] border-[1px] rounded-full p-1'>
                                                    <img src={userImage !== null ? userImage : "../"} className='h-full w-full overflow-hidden' alt="user" />
                                                </div>
                                                <div>
                                                    <p className='text-[16px]'>{user.name}</p>
                                                    <p className='text-[16px] font-normal text-[#939393]'>{feedback.message}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <form className='flex items-center my-10 gap-x-5 w-full'
                                    onSubmit={(e) => { handleFeedBack(e, message, user.nationalID, carDetail.userrID, carDetail.licencePlate) }}
                                >
                                    <div className=' h-[40px] w-[40px] border-[1px] rounded-full p-1'>
                                        <Link href="/profile/page">
                                            <img src={userImage !== null ? userImage : "../"} className='h-full w-full overflow-hidden' alt="user" />
                                        </Link>
                                    </div>
                                    <input value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 text-[16px] border-[1px] font-normal rounded-lg py-2 px-5 focus:outline-none' type='text' required placeholder='Say your opinion...' />
                                    <button type='submit' className='text-nowrap cursor-pointer text-[16px]  px-4 py-1 rounded-3xl bg-[var(--blue-color)] text-white'> Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {rentClicked &&
                    <div data-aos="zoom-in" className='bg-[#000000ad] absolute top-0 left-0 w-full h-full z-30 '>
                        <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                            <RequestForm user={user} carDetail={carDetail} setRentClicked={setRentClicked} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CarDetail;
