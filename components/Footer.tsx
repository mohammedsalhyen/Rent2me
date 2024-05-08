import React from 'react'
import { FaFacebook, FaInstagram, FaSkype, FaTwitter } from "react-icons/fa"
// Footer.js

const Footer = () => {
    return (
        <footer className='main-prop overflow-hidden' >
            <div className=" max-container padding-container" data-aos="fade-up" data-aos-delay="1000">
                <h2>
                    <img src='/asset/logo (2).png' alt=''/>
                </h2>
                <section>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">FAQS</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">Call Center</a></li>
                        <li>Rent2me@gmail.com</li>
                        <li>01110948994</li>
                    </ul>
                    <div className="address text-center">
                        <h4>Our Address</h4>
                        <p>Egypt-Minia</p>
                        <ul className="dev-links text-center w-full">
                            <li><a href=""><FaFacebook/></a></li>
                            <li><a href=""><FaInstagram/></a></li>
                            <li><a href=""><FaSkype/></a></li>
                            <li><a href=""><FaTwitter/></a></li>
                        </ul>
                    </div>
                </section>
                <p className='text-center'>Rent2Me 2023, all Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
