
import { urlFor } from '@/lib/client';
import React, { useEffect, useState } from 'react'
const CarDetail = ({car,setDetails}:any) => {

  const handleClose = () => {
    setDetails(false); // Update details state in the parent component
};
  return (
    <div 
    data-aos="fade-in"
    className=' main-prop max-container px-5 h-[100vh] w-full bg-white relative text-black  rounded-lg'>
      <div className='flex-1'>
      <img className='w-full h-full' src={`${urlFor(car.image)}`} alt="" />
      </div>
      <div className="car-details flex-1 relative">
        <div className="column">
          <div>
            <label>Car Brand: </label>
            <span className="brand" >{car.carBrand}</span>
          </div>
          <div>
            <label>Car Model: </label>
            <span className="model">  {car.carModel} </span>
          </div>
          <div>
            <label>year: </label>
            <span className="year">{car.year}</span>
          </div>
          <div>
            <label>Color: </label>
            <span className="color">{car.color}</span>
          </div>
          <div>
            <label>License Plate: </label>
            <span className="NOD">{car.licensePlate}</span>
          </div>
          <div>
            <label>Mileage </label>
            <span className="mile">{car.mileage}</span>
          </div>
          <div>
            <label>Fuel Type: </label>
            <span className="fuel-type">{car.fuelType}</span>
          </div>
          <div>
            <label>seating capacity: </label>
            <span className="seats-num">{car.seatNum}</span>
          </div>
          <div>
            <label>seating capacity: </label>
            <span className="seats-num">{car.postedBy?.mail}</span>
          </div>
          <div>
          <a href="#" className=' px-6 py-3 rounded-3xl bg-orange-500'>Rent it Now</a>
          </div>
        </div>
        <button  onClick={handleClose} className=' w-[30px] h-[30px] p-0 rounded-full bg-red-600 text-white flex justify-center items-center absolute top-0 right-0'>x</button>
      </div>
    </div>
  )
}

export default CarDetail;
