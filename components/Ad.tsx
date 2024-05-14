import React from 'react'
import { FaHeadphones } from "react-icons/fa"
const Ad = () => {
    return (
        <div className=' overflow-hidden min-h-[500px] gap-10 max-container xs:text-center lg:text-start xs:flex-col lg:flex-row text-[var(--blue-color)] padding-container main-prop flex justify-between items-center'>
            <p data-aos="fade-right" className=' flex-1 font-bold text-3xl  text-[var(--blue-color)]'>
                What we offer is luxurious transportation and an exceptionally comfortable experience.
            </p>
            <div className=' flex-1 ' data-aos="fade-left">
                <p className='  text-lg block mb-5'>
                    Benefit from the experience of purchasing your perfect car through
                    our leading website in the luxury and comfortable car industry.
                    We offer you a wide range of elegant and luxurious options that suit your tastes and needs.
                    With our competitive prices and high quality.
                </p>
                <div className=' flex w-full xs:justify-center lg:justify-start gap-1 text-[18px]  font-bold animate-pulse text-[var(--orange-color)]'>
                    <span >
                        Call Center:rent2me@gmail.com
                    </span>
                    <FaHeadphones className='  text-[30px]  '/>
                </div>

            </div>
        </div>
    )
}

export default Ad
