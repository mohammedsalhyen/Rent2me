import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import loading from "../public/animation/loading.json";
import AOS from "aos"
const Loading = ({text}:any) => {
    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            delay: 200
        });
    }, []);
  return (
    <div className='   flex-center'>
       <div data-aos="fade-in">
                <div className='mt-5 w-72 '>
                    <Lottie animationData={loading} className='w-full h-full' loop={true} />
                </div>
                <div className='' data-aos="fade-up"  data-aos-delay="500">
                    <p className='text-[var(--blue-color)] text-center mt-5 font-bold text-[20px] mb-10'>{text} </p>
                </div>
            </div>
    </div>
  )
}

export default Loading
