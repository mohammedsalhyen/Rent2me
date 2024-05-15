import React, { useEffect, useState } from 'react'
import AOS from "aos"
import { FaImage } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
const AcceptForm = ({ user,setAcceptClicked,id }: any) => {
    const [contract, setContract]:any = useState("");

    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
    }, []);

    const handleupload = (setter: any) => (e: any) => {
        setter(e.target.files[0]);
    };



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setAcceptClicked(false);
          //Case of Accept Request
        try {
            const formData = new FormData();
            formData.append('Image', contract);
            const response = await fetch(`http://rent2me.runasp.net/api/RentalRequest/accept/?id=${id}`, {
                method: 'POST',         
                body: formData,
            });
            if (response.ok) {
                alert("true")
            } else {
                console.error('Error:', response.statusText);
                alert("false")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className=' relative xs:w-[300px] sm:w-[400px] '>
            <button type='button' onClick={() => setAcceptClicked(false)} className=' text-[#f00] absolute -top-10 -right-3 text-4xl z-10'><MdCancel /></button>
            <p className='my-5 text-3xl font-bold text-[var(--blue-color)] text-center'> Your Last Step</p><div className=" flex   mb-3 items-center border-[1px] rounded-3xl border-[#DDD] gap-1 p-3 text-[#a9a9a9]">
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
                value="Accept Now"
                className=" w-full cursor-pointer text-lg  mb-3 flex-center bg-[var(--blue-color)]  border-[1px] rounded-3xl border-none gap-1 py-4 text-white"
            />
        </form>
    )
}

export default AcceptForm
