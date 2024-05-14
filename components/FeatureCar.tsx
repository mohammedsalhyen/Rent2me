
import React, { useEffect, useState } from 'react'
import Car from './Car';
import Loading from './Loading';

const FeatureCar = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch('http://rent2me.runasp.net/api/Car/DisplayAllCars');

                
                    const data = await response.json();
                    setCars(data)
                    console.log(cars)
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchCar();
        console.log(cars)

    }, []);
    console.log(cars)
    return (
        <div className="bg-[var(--dark-gray-color)] main-prop padding-container">
            <div className="max-container" id='car-gallery'>
                <div className="section-title mb-7">
                    <h2>Featured Cars</h2>
                    <span> Your amazing Car find it here</span>
                </div>
                <div className=" grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cars.map((car: any, index: number) => (
                        <Car car={car} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default FeatureCar
