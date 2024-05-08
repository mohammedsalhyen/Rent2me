import React from 'react'
import { tips } from "../Constant/index"
import Link from 'next/link'
const Tip = () => {
    return (
        <div className="tips main-prop  bg-[#111417]">
            <div className="max-container padding-container">
                <ul className=' grid xs:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10'>
                    {tips.map((tip, index) => (
                        <li data-aos="zoom-in-up" data-aos-delay={`${index+1}00`} className=' p-5 rounded-lg bg-[#0e0e0e] flex flex-col flex-center' key={index}>
                            <p className=' text-[40px]  p-5 text-orange-500 font-extrabold'>{tip.icon}</p>
                            <h3 className=' font-bold py-3 text-xl'>{tip.name}</h3>
                            <p className=' text-[#838383] text-center mb-6'>{tip.desc}</p>
                            <Link href={`${tip.href}` } className='text-[var(--orange-color)]'>{tip.link}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tip
