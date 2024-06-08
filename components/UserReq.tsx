import React, { useEffect, useState } from 'react'
import { FaRegTimesCircle } from "react-icons/fa";
import AcceptForm from './AcceptForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStateContext, IStateContext } from '@/context/StateContext';
import Requester from './Requester';
const UserReq = ({ user }: any) => {
    const { showRequester, setShowRequester } = useStateContext() as IStateContext;
    const [requests, setRequests]: any = useState([]);
    const [image, setImage]: any = useState(null);
    const [acceptClicked, setAcceptClicked]: any = useState(false);



    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('nationalId', user.nationalID);
                queryParams.append('status', 2 as unknown as string);
                const queryString = queryParams.toString();

                const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/DisplayUserRequests?${queryString}`);
                const data = await response.json();
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Failed to fetch data');
                }
                setRequests(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (user.nationalID) {
            fetchRequests();
        }

        return () => { };
    }, []);



    //Case of reject Request
    const handleReject = async (id: string) => {
        try {
            const response = await fetch(`http://rent2me.runasp.net/api/RentalRequest/reject/?id=${id}`, {
                method: 'POST',
            });
            if (response.ok) {
                alert("done")
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    //Download image 
    const handleDownload = async (requestId: number) => {
        try {
            const response = await fetch(`http://rent2me.runasp.net/api/Contract/${requestId}/contract`);
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



    return (
        <div className='main-prop border-t-2 border-[#DDD]'>
            <div>
                <p className='text-3xl font-semibold mb-10'>Your Requests</p>
            </div>
            {requests.length === 0 ? (
                <div className=' w-full my-10 flex-center flex-col'>
                    <div className='w-[300px]'>
                        <img src="/asset/no1.png" className='w-full' alt="no" />
                    </div>
                    <p className=' text-xl font-semibold mt-5 mb-10'>You don't have any requests.</p>
                </div>
            ) : (
                <div>
                    {requests.map((request: any, index: number) => (
                        <div key={index} className='flex gap-5 items-center w-full my-3 relative xs:justify-center sm:justify-between border-2 border-[#969696] p-5 xs:flex-col  sm:flex-row rounded-5xl'>
                            <div className='flex flex-col xs:items-center sm:items-start text-lg '>
                                <p className=' text-[var(--blue-color)] font-bold text-xl my-3'> Car number: {request.licensePlate}</p>

                                <div className=' flex xs:flex-col sm:flex-row xs:items-center gap-5'>
                                    <p>place Of Delivery: {request.placeOfDelivery}</p>
                                    <p>time Of Delivery: {request.timeOfDelivery}</p>
                                </div>
                            </div>
                            <div className='text-white flex  gap-3'>
                                <button
                                    type='button'
                                    className='bg-[#2ce02f] py-2 px-4 rounded-3xl ' onClick={() => { handleDownload(request.requestId); setAcceptClicked(true) }}>
                                    Accept
                                </button>
                                <button type='button' className='bg-[#f00] py-2 px-4 rounded-3xl' onClick={() => handleReject(request.requestId)}>
                                    Reject
                                </button>
                                <button onClick={() => setShowRequester(true)}
                                    className='bg-[var(--blue-color)] py-2 px-4 rounded-3xl'
                                >Show Renter</button>
                            </div>
                            {acceptClicked &&
                                <div data-aos="zoom-in" className='bg-[#000000ad] fixed top-0 left-0 w-full h-full z-30 '>
                                    <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                                        <AcceptForm user={user} setAcceptClicked={setAcceptClicked} id={request.requestId} />
                                    </div>
                                </div>
                            }

                            <Requester id ={request.requesterId}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserReq
