import React, { useEffect, useState } from 'react'

const UserReq = ({ user }: any) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('nationalId', user.nationalID);
                const queryString = queryParams.toString();

                const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/GetUserRequests/?${queryString}`);
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

        return () => {};
    }, []);
    return (
        <div className='main-prop border-t-2 border-[#DDD]'>
            <div>
                <p className='text-3xl font-semibold'>Your Requests</p>
            </div>
            {requests.length === 0 ? (
                <div className=' w-full my-10 flex-center flex-col'>
                    <div className='w-[300px]'>
                        <img src="/asset/no1.png" className='w-full' alt="no" />
                    </div>
                    <p className=' text-xl font-semibold mt-5 mb-10'>You don't have any requests.</p>
                </div>
            ) : (
                <div>You have {requests.length} request(s).</div>
            )}
        </div>
    )
}

export default UserReq
