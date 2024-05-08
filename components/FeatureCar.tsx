"use client"
import { urlFor } from '@/lib/client';
import { fetchCar } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaUser ,FaHeart} from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import Car from './Car';

const FeatureCar = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const carsData = await fetchCar();
            setCars(carsData);
        };
        fetchData();
    }, []);
    return (
        <div className="bg-[var(--dark-gray-color)] main-prop padding-container">
            <div className="max-container" id='car-gallery'>
                <div className="section-title mb-7">
                    <h2>Featured Cars</h2>
                    <span> Your amazing Car find it here</span>
                </div>
                <div className=" grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cars.map((car:any, index:number) => (
                        <Car car={car} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default FeatureCar
