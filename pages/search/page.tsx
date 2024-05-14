"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Car from '@/components/Car'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const page = () => {
    const searchParams = useSearchParams()
    const brand = searchParams.get('brand');
    const color = searchParams.get('color');
    const year = searchParams.get('year');
    const model = searchParams.get('model');
    const [cars, setCars] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const requestBody = {
                    "Brand":brand,
                    "Color":color,
                    "Year":year,
                    "Model":model,
                };
                const response = await fetch('http://rent2me.runasp.net/api/Car/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.ok) {
                    const data = await response.json();
                    setCars(data);
                    console.log(data)
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [brand, color, year, model]); 

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
