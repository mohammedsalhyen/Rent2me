import { useStateContext, IStateContext } from '@/context/StateContext';
import React, { useEffect, useState } from 'react'
import { IoMdExit } from 'react-icons/io'

const Requester = ({id}:any) => {
    const { showRequester, setShowRequester } = useStateContext() as IStateContext;
    const[image,setImage]=useState(null)
    const[user,setUser]:any=useState("")
    useEffect(() => {
//get user
const fetchUser = async (userId:any) => {
    try {
        const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user image');
        }
        const data = await response.json();
        setUser(data)
    } catch (error) {
        console.error('Error fetching user image:', error);
        setImage(null);
    }
};

fetchUser(id);


    //get user image
    const fetchUserImage = async (userId:any) => {
        try {
            const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}/image`);
            if (!response.ok) {
                throw new Error('Failed to fetch user image');
            }
            const blob = await response.blob();
            const imageUrl:any = URL.createObjectURL(blob);
            setImage(imageUrl);
        } catch (error) {
            console.error('Error fetching user image:', error);
            setImage(null);
        }
    };

    fetchUserImage(id);
}, [id]);
    return (
        <div>
            <div>
                {showRequester &&
                    <div data-aos="fade-left" className='profile-bg fixed z-40 top-0 right-0 w-full'>
                        <div className=' main-prop max-container px-5 h-[100vh] relative text-black'>
                            <div className='flex justify-between items-center '>
                                <button
                                    type='button'
                                    title='Exit'
                                    onClick={() => setShowRequester(false)}
                                    className=' text-red-500 text-lg bg-[#EEE] flex-center w-[40px] h-[40px] rounded-full'>
                                    <IoMdExit />
                                </button>
                            </div>
                            <div className=' overflow-hidden profile-bg min-h-[100vh]'>
                                <div className="max-container padding-container relative text-[var(--blue-color)]">
                                    <div className="content flex-center flex-col text-center">
                                        <div className=' relative'>
                                            <div className='w-[250px] relative  border-2 border-[var(--orange-color)] overflow-hidden rounded-full '>
                                                <img className='w-full h-full' src={image !== null ? image : "../"} id="Photo" alt='profile' />
                                            </div>
                                        </div>
                                        <div className="details">
                                            <section className="name">
                                                <div className=" text-[34px] font-bold text-[var(--blue-color)]">{user?.name}</div>
                                            </section>
                                            <section className="email">
                                                <div id="mail" className="text-[22px] mt-3">{user?.mail}</div>
                                            </section>
                                            <div className='flex-center xs:flex-col sm:flex-row gap-3 mt-10 text-white'>
                                                <div className=" bg-[#b7b7b7] p-2 rounded-lg">{user?.nationalID}</div>
                                                <div className="bg-[#b7b7b7] p-2 rounded-lg">{user?.address}</div>
                                                <div className="bg-[#b7b7b7] p-2 rounded-lg">{user?.phone}</div>
                                            </div>
                                        </div>
                                    </div>





                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Requester

