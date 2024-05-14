import React, { useEffect, useState } from 'react'
import AOS from "aos"
import { FaTimesCircle, FaPlaceOfWorship, FaImage } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
const EditUser = ({ user, setEditClicked }: any) => {
    const [propertyName, setPropertyName] = useState("");
    const [newValue, setNewValue] = useState("");
    const [image, setImage]:any = useState(null);
    const [editImage, setEditImage] = useState(false);
    const handleInputChange = (setter: any) => (e: any) => {
        setter(e.target.value);
    };
    const handleupload = (setter: any) => (e: any) => {
        setter(e.target.files[0]);
    };
    const handleUploadImage= async()=>{
        const formData = new FormData();
        formData.append("Image",image )
        try {
            const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${user.nationalID}/updateProfileImage`, {
                method: 'PATCH',
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
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setEditClicked(false)
        if(editImage){
            handleUploadImage();
        }
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
        <form onSubmit={handleSubmit} className=' relative px-10 xs:w-[300px] md:w-[700px]'>
            <button type='button' onClick={() => setEditClicked(false)} className=' text-[#f00] absolute -top-10 -right-3 text-4xl z-10'><MdCancel /></button>
            <p className='my-5 text-3xl font-bold text-[var(--blue-color)] text-center'> Edit Your Information</p>
            <div className=" flex mt-8  mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                <select
                    name="carBrand"
                    id="brand"
                    value={propertyName}
                    onChange={handleInputChange(setPropertyName)}
                    className='text-black w-full focus:outline-none bg-inherit'
                    required>
                    <option value="Name">Name</option>
                    <option value="Address">Address</option>
                    <option value="Phone">Phone</option>
                    <option value="Mail">Email</option>
                </select>
            </div>
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
            { 
                editImage&&
                <div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
                <FaImage className=' text-xl' />
                <p className=' ml-2 text-nowrap'>Upload Contract Image</p>
                <input
                    type="file"
                    name="contract"
                    multiple
                    accept="image/*"
                    onChange={handleupload(setImage)}
                    className=' opacity-0'
                />
            </div>
            }
            <input type="submit"
                value="Edit Now"
                className=" w-full cursor-pointer text-lg  flex-center bg-[var(--blue-color)]  border-[1px] rounded-3xl border-none gap-1 py-3 text-white"
            />
            <button onClick={()=>setEditImage(!editImage)} type='button'  className='text-[var(--orange-color)] border-none bg-inherit text-start my-3 font-bold' >You also need change image?</button>
        </form>
    )
}

export default EditUser