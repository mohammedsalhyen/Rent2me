"use client"
import React from 'react'
import Lottie from "lottie-react";
import about from "../public/animation/about.json";
const About = () => {
    return (
        <div className=' main-prop' id='About'>
            <div data-aos="fade-in" className=' overflow-hidden max-container py-24 padding-container xs:flex-col-reverse md:flex-row flex items-center justify-between bg-black'>
                <div className='mt-5' data-aos="fade-right"  data-aos-delay="500">
                    <Lottie animationData={about} loop={true} />
                </div>
                <div className='xs:text-center md:text-start' data-aos="fade-left"  data-aos-delay="500">
                    <p className='text-[var(--orange-color)] font-bold text-[24px] mb-10'>Who we are </p>
                    <p className=' text-lg  xs:mx-auto md:mx-0 w-4/5'>
                        We are Rent2me website  for modern cars,
                        Here, the elegance and authenticity of the past blend with the harmony
                        and speed of the present and future technology. We also offer you many
                        advantages and facilities, in addition to after-sales services.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
