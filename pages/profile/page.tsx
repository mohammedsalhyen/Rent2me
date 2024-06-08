
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FaUserEdit, FaCamera } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdCircleNotifications } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useStateContext, IStateContext } from '@/context/StateContext';
import Loading from '@/components/Loading';
import Notification1 from '@/components/Notification1';
import UserReq from '@/components/UserReq';
import Car from '@/components/Car';
import EditUser from '@/components/EditUser';
import Requester from '@/components/Requester';
import RejectedRequest from '@/components/RejectedRequest';
import AcceptedRequest from '@/components/AcceptedRequest';
import { handleUploadImage } from '@/utils/data';

const fetchNotifications = async (userId: any) => {
    try {
        const response = await fetch(`http://rent2me.runasp.net/Notification/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

export const fetchUserImage = async (userId: any) => {
    try {
        const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}/image`);
        if (!response.ok) {
            throw new Error('Failed to fetch user image');
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching user image:', error);
        return null;
    }
};

const fetchUserCars = async (userId: any) => {
    try {
        const response = await fetch(`http://rent2me.runasp.net/api/Car/DisplayByUser/?nationalId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user cars');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user cars:', error);
        return [];
    }
};

const fetchData = async (userId: any) => {
    try {
        const [notifications, userImage, userCars] = await Promise.all([
            fetchNotifications(userId),
            fetchUserImage(userId),
            fetchUserCars(userId)
        ]);
        return { notifications, userImage, userCars };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { notifications: [], userImage: null, userCars: [] };
    }
};

const page = () => {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [user, setUser]: any = useState();
    const [propertyName, setPropertyName]: any = useState();
    const [photo, setPhoto] = useState(null);
    const NotificationRef: any = useRef(null);
    const [data, setData] = useState({ notifications: [], userImage: null, userCars: [] });

    useEffect(() => {
        // Function to get data from local storage
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if (userJson !== null) {
                return JSON.parse(userJson);
            }
            return null; // Return null if no data found in local storage
        };

        const userFromLocalStorage = getDataFromLocalStorage();

        if (userFromLocalStorage) {
            setUser(userFromLocalStorage); // Set user state if data exists in local storage
            fetchData(userFromLocalStorage.nationalID)
                .then((result: any) => setData(result))
                .catch((error) => console.error('Error setting data:', error));
        }

        const handleClickOutside = (event: any) => {
            // Assuming NotificationRef is a ref pointing to a DOM element
            if (NotificationRef.current && !NotificationRef.current.contains(event.target)) {
                setShowNotification(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    if (!user) {
        return <div className=''> <Loading text={"We are Loading Your Data..."} /> </div>; // Return loading indicator if car is not set yet
    }
    // Function to fetch Notifications from the API


    const handleLogout = () => {
        localStorage.clear()
        router.push("/")
    }

    const handleNotification = () => {
        setShowNotification(!showNotification);
    };




    const handleupload = (setter: any) => (e: any) => {
        setter(e.target.files[0]);
    };


    return (
        <div className=' overflow-hidden profile-bg min-h-[100vh]'>
            <div className="max-container padding-container relative text-[var(--blue-color)]">
                <div className='w-full flex justify-between items-center py-7'>
                    <Link href={"/"} className='w-[150px]'  >
                        <img className=' w-full' src="/asset/logo (2).png" alt='' />
                    </Link>
                    <div className='flex-center gap-3 '>
                        <button onClick={handleNotification} type='button' className=' text-5xl relative'>
                            <p className=' text-sm w-5 h-5 rounded-full flex-center text-white absolute top-0 left-0 bg-[#f00]'>
                                {data.notifications?.length}
                            </p>
                            <MdCircleNotifications />
                        </button>
                        <div className='text-red-700 font-bold bg-white py-4 px-8 border-none rounded-3xl flex-center gap-2' >
                            <button onClick={() => handleLogout()}>Logout</button>
                            <IoMdLogOut />
                        </div>
                    </div>
                </div>
                <div className="content flex-center flex-col text-center">
                    <div className=' relative'>
                        <div className='w-[250px] h-[250px] relative  border-2 border-[var(--orange-color)] overflow-hidden rounded-full '>
                            <img className='w-full h-full' src={data.userImage !== null ? data.userImage : "../"} id="Photo" alt='profile' />
                            
                        </div>
                        <label className=' h-fit absolute z-30 left-1/2 -bottom-6 -translate-x-1/2'>
                            <p className=" font-bold  text-4xl cursor-pointer" >
                                <FaCamera />
                            </p>
                            <input
                                type="file"
                                name="upload"
                                onChange={(e)=>{handleUploadImage(e,user.nationalID)}}
                                className="h-0 w-0"
                            />
                        </label>
                        
                    </div>

                    <div className="details">
                        <section className=" text-[34px] font-bold text-[var(--blue-color)] flex-center gap-2">
                            <div >{user?.name}</div>
                            {showEdit &&
                                <>
                                    <button type='button' onClick={() => { setEditClicked(true); setPropertyName("Name") }}><MdEdit /></button>
                                    {editClicked &&
                                        <div data-aos="zoom-in" className='bg-[#000000ad] fixed top-0 left-0 w-full h-full z-30 '>
                                            <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                                                <EditUser user={user} setEditClicked={setEditClicked} propertyName={propertyName} />
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </section>
                        <section className="text-[22px] mt-3 flex-center gap-2">
                            <div>{user?.mail}</div>
                            {showEdit &&
                                <>
                                    <button type='button' onClick={() => { setEditClicked(true); setPropertyName("Mail") }}><MdEdit /></button>
                                    {editClicked &&
                                        <div data-aos="zoom-in" className='bg-[#000000ad] fixed top-0 left-0 w-full h-full z-30 '>
                                            <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                                                <EditUser user={user} setEditClicked={setEditClicked} propertyName={propertyName} />
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </section>
                        <div className='flex-center xs:flex-col sm:flex-row gap-3 mt-10 text-white '>
                            <div className=" bg-[#b7b7b7] p-2 rounded-lg">
                                <p>{user?.nationalID}</p>
                            </div>
                            <div className="bg-[#b7b7b7] p-2 rounded-lg flex-center gap-2">
                                {user?.address}
                                {showEdit &&
                                    <>
                                        <button type='button' onClick={() => { setEditClicked(true); setPropertyName("Address") }}><MdEdit /></button>
                                        {editClicked &&
                                            <div data-aos="zoom-in" className='bg-[#000000ad] fixed top-0 left-0 w-full h-full z-30 '>
                                                <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                                                    <EditUser user={user} setEditClicked={setEditClicked} propertyName={propertyName} />
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            <div className="bg-[#b7b7b7] p-2 rounded-lg flex-center gap-2">
                                {user?.phone}
                                {showEdit &&
                                    <>
                                        <button type='button' onClick={() => { setEditClicked(true); setPropertyName("Phone") }}><MdEdit /></button>
                                        {editClicked &&
                                            <div data-aos="zoom-in" className='bg-[#000000ad] fixed top-0 left-0 w-full h-full z-30 '>
                                                <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                                                    <EditUser user={user} setEditClicked={setEditClicked} propertyName={propertyName} />
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='text-white mt-5 mb-14 bg-[var(--orange-color)] rounded-3xl py-3  px-6 border-none flex-center gap-2 '>
                        <FaUserEdit />
                        <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
                    </div>
                </div>
                <div className='main prop '>
                    <UserReq user={user} />
                </div>
                <div className='main prop border-t-2 border-[#DDD]'>
                    <div>
                        <p className=' my-10 text-3xl font-semibold'>Your Own Car</p>
                    </div>
                    <div className=" grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {data.userCars.map((car: any, index: number) => (
                            <Car car={car} key={index} />
                        ))}
                    </div>
                    <div className=' w-full text-center my-10'>
                        <Link href="/addCar/page" className='bg-[var(--blue-color)] text-xl text-white py-3 px-10 rounded-3xl '>Add Car</Link>
                    </div>
                </div>
                <div className='main prop '>
                    <AcceptedRequest user={user} />
                </div>
                <div className='main prop '>
                    <RejectedRequest user={user} />
                </div>
                {
                    showNotification && <div ref={NotificationRef}> <Notification1 notifications={data.notifications} /></div>
                }
            </div>

        </div>
    )
}

export default page

