"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchQuery } from '@/utils/data'
import { client } from '@/lib/client'
import Car from '@/components/Car'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const page = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('input')
    const [cars, setCars] = useState([]);
    useEffect(() => {
        const query = searchQuery(search);
        client.fetch(query).then((data) => {
            setCars(data);
        });
    }, [search]);
    return (
        <div>
            <div className=' search-bg  padding-container'>
                <Navbar />
                
                <div className=' max-container main-prop'>
                    <p className='text-2xl text-[--orange-color] pt-10 pb-5'>Search Results </p>
                    <div className="car-store grid grid-cols-3 gap-5 ">
                        {cars.map((car: any, index: number) => (
                            <Car car={car} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    );
};

export default page
