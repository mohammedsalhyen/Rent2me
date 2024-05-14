
import { useStateContext, IStateContext } from '@/context/StateContext';
import React, { useEffect, useState } from 'react'

const Subscription = () => {
    const { user, setShowCart, setPlan } = useStateContext() as IStateContext;
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const fetchSubscriptionPlans = async () => {
            try {
                const response = await fetch('http://rent2me.runasp.net/api/Subscription/subscription-plans');
                if (response.ok) {
                    const data = await response.json();
                    setPlans(data);
                } else {
                    console.error('Failed to fetch subscription plans:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching subscription plans:', error);
            }
        };

        fetchSubscriptionPlans();

    }, []);

    return (
        <div className=" bg-[var(--dark-gray-color)] main-prop" id='Plans'>
            <div className="max-container padding-container">
                <div className="section-title" data-aos="fade-in">
                    <h2 className="">Featured Plan</h2>
                    <span>Choose your faviorate plan</span>
                </div>
                <div className="plans padding-container grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-5">
                    {plans.map((plan: any, index: number) => (
                        <div
                            className=' grid  grid-cols-1 text-center bg-[var(--blue-color)]  p-10 border-[1px] border-[var(--med-gray-color)] transition-all hover:border-[var(--orange-color)] my-10 '
                            key={index}
                            data-aos="fade-up" data-aos-delay={`${index + 2}00`}
                        >
                            <div className="head border-b-[1px] border-[var(--med-gray-color)] pb-3 ">
                                <h3 className='text-3xl text-white mb-3'>{plan.name}</h3>
                                <span className='text-white'>{plan.price} </span>
                            </div>
                            <p className='plan-description text-white  py-5 font-bold'>{plan.description}</p>
                            <p className=' text-[var(--white-gray-color)] mb-10 '> The number of process is  {plan.numOfProcesses}</p>
                            <div className="foot">
                                <div className='  justify-self-end py-3 px-6 border-[1px] text-[var(--orange-color)] border-[var(--orange-color)] '>
                                    {
                                        user ? (
                                            <button className='w-full h-full' type='button' onClick={() => {
                                                localStorage.setItem("plan", JSON.stringify(plan));
                                                setPlan(plan)
                                                setShowCart(true)
                                            }}>
                                                Buy Now
                                            </button>
                                        ) : (
                                            <div >
                                                <div>You Should Login first</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Subscription