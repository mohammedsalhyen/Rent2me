import React, { useEffect, useState } from 'react'
import AOS from "aos"
import { FaTimesCircle, FaPlaceOfWorship, FaImage } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
const RequestForm = ({user, carDetail,setRentClicked}:any) => {
    const [time, setTime] = useState("");
    const [place, setPlace] = useState("");
    const [contract, setContract] = useState("");

    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
    }, []);




    const handleInputChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };
    const handleupload = (setter: any) => (e: any) => {
        setter(e.target.files[0]);
    };


    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setRentClicked(false)
        const formData = new FormData();
        formData.append('RequesterId',user?.nationalID);
        formData.append('CarOwnerId',carDetail.userrID);
        formData.append('LicensePlate',carDetail.licencePlate);
        formData.append('TimeOfDelivery',time);
        formData.append('PlaceOfDelivery', place);
        formData.append('RenterContract', contract)
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch('http://rent2me.runasp.net/api/RentalRequest', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Sendding successful:', responseData);

                alert("true");
                
            } else {
                console.error('sending failed:', response.statusText);
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
            <form onSubmit={handleSubmit} className=' relative xs:w-[300px] sm:w-[400px] '>
                <button type='button' onClick={()=>setRentClicked(false)} className=' text-[#f00] absolute -top-10 -right-3 text-4xl z-10'><MdCancel/></button>
                <p className='my-5 text-3xl font-bold text-[var(--blue-color)] text-center'> Your Last Step</p>
                <div className=" flex mt-8  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                    <FaTimesCircle />
                    <input
                        type="datetime-local"
                        value={time}
                        onChange={handleInputChange(setTime)}
                        placeholder=" Time Of Delivery "
                        required
                        className=' w-full  focus:outline-none bg-inherit'
                        
                    />
                </div>
                <div className=" flex mt-8  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                    <FaPlaceOfWorship />
                    <input
                        type="text"
                        value={place}
                        onChange={handleInputChange(setPlace)}
                        placeholder=" Place Of Delivery "
                        required
                        className='text-black w-full focus:outline-none bg-inherit'
                    />
                </div><div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                    <FaImage className=' text-xl' />
                    <p className=' ml-2 text-nowrap'>Upload Contract Image</p>
                    <input
                        type="file"
                        name="contract"
                        multiple
                        accept="image/*"
                        onChange={handleupload(setContract)}
                        className=' opacity-0'
                    />
                </div>
                <input type="submit"
                    value="Send Request"
                    className=" w-full cursor-pointer text-lg  mb-3 flex-center bg-[var(--blue-color)]  border-[1px] rounded-3xl border-none gap-1 py-4 text-white"
                />
            </form>
    )
}

export default RequestForm
