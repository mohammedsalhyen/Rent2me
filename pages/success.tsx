import React, { useEffect } from 'react';
import Link from 'next/link';
import { runFireworks } from '../utils/data';
import { useStateContext, IStateContext } from '@/context/StateContext';

const Success = () => {
    const { user, setUser, plan ,setPlan} = useStateContext() as IStateContext;

    useEffect(() => {
        const userJson: any = localStorage.getItem('user');
        setUser(JSON.parse(userJson));
        const planJson: any = localStorage.getItem('plan');
        setPlan(JSON.parse(planJson));
    }, []);

    useEffect(() => {
        // This useEffect will run whenever 'user' changes
        if (user) {
            successPay();
            runFireworks();
        }
    }, [user,plan]); // Add 'user' as a dependency

    const successPay = async () => {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('customerId', user.nationalID);
            queryParams.append('planName', plan.name);
            const queryString = queryParams.toString();
        
            const subscribeEndpoint = `http://rent2me.runasp.net/api/Subscription/subscribe?${queryString}`;
            const subscribeResponse = await fetch(subscribeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        
            if (subscribeResponse.ok) {
                alert("Data sent to backend successfully");
            } else {
                throw new Error('Failed to subscribe');
            }
        } catch (error) {
            console.error(error);
            // Handle errors here
        }
    }

    return (
        <div className="search-bg min-h-[100vh] flex-center">
            <div className=" flex-center flex-col bg-[#000] rounded-2xl p-10 text-[#FFF] text-center ">
                <div className="w-[100px]">
                    <img src='/asset/success.png' alt="" />
                </div>
                <h2 className=' text-xl mt-5'>Thank you for your upgrade</h2>
                <p className=' text-lg mt-1'>Check your email inbox for the receipt.</p>
                <p className=' text-lg mt-1'>
                    If you have any questions, please email
                    <a className=' text-[var(--orange-color)]' href="mailto:order@example.com">
                        rent2me@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" className="py-3 px-6 mt-3 text-lg rounded-3xl  bg-[var(--orange-color)] ">
                        Back to Home Page
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success