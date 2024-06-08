import { fetchUser } from '@/utils/data';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaImage } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
const EditUser = ({ user, setEditClicked ,propertyName}: any) => {
     const router=useRouter();
    const [newValue, setNewValue] = useState("");
    const handleInputChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setEditClicked(false)
        const requestBody = {
            "PropertyName": propertyName,
            "NewValue": newValue
        };
        try {
            const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/update?nationalId=${user.nationalID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Sendding successful:', responseData);
                fetchUser(user.nationalID);
                
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
        router.refresh();
    };
    return (
        <form onSubmit={handleSubmit} className=' relative px-10 xs:w-[300px] md:w-[700px]'>
            <button type='button' onClick={() => setEditClicked(false)} className=' text-[#f00] absolute -top-10 -right-3 text-4xl z-10'><MdCancel /></button>
            <p className='my-5 text-3xl font-bold text-[var(--blue-color)] text-center'> Edit Your {propertyName}</p>
            <div className=" flex mt-8  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                <input
                    type="text"
                    value={newValue}
                    onChange={handleInputChange(setNewValue)}
                    placeholder=" Your data"
                    required
                    className='text-black w-full focus:outline-none bg-inherit'
                />
            </div>
           
            <input type="submit"
                value="Edit Now"
                className=" w-full cursor-pointer text-lg  flex-center bg-[var(--blue-color)]  border-[1px] rounded-3xl border-none gap-1 py-3 text-white"
            />
        </form>
    )
}

export default EditUser