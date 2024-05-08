"use client"
import { fetchCar, fetchPlan } from '@/utils/data';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Subscription = ({ user, setShowCart, setPlan }: any) => {
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const plansData = await fetchPlan();
            setPlans(plansData);
        };
        fetchData();
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
                                <h3 className='text-3xl mb-3'>{plan.name}</h3>
                                <span >{plan.price} $</span>
                            </div>
                            <p className='plan-description py-5 font-bold'>{plan.description}</p>
                            <p className=' text-[var(--white-gray-color)] mb-10 '>{plan.features}</p>
                            <div className="foot">
                                <div className='  justify-self-end py-3 px-6 border-[1px] border-[var(--orange-color)] '>
                                    {
                                        user ? (
                                            <button className='w-full h-full' type='button' onClick={() => {setShowCart(true);setPlan(plan.price)}}>
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