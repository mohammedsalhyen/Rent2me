"use client"
import React, { useEffect, useState } from 'react'
import About from './About'
import Ad from './Ad'
import Ad2 from './Ad2'
import Contact from './Contact'
import FeatureCar from './FeatureCar'
import Footer from './Footer'
import Landing from './Landing'
import Subscription from './Subscription'
import Tip from './Tip'
import Cart from './Cart'
import ContarctUi from './CotractUi'

const Home = () => {
    const [user, setUser] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [plan, setPlan] = useState();
    useEffect(() => {
        // Function to get data from local storage
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if (userJson !== null) {
                const localStorageData = JSON.parse(userJson);
                setUser(localStorageData);
            }
        }
        getDataFromLocalStorage();
        console.log(user);
        return () => {
        };
    }, []);
    return (
        <div>
            <div className=' relative' >
                <Landing />
                <Ad />
                <Subscription user={user} setShowCart={setShowCart} setPlan={setPlan} />
                <About />
                <Ad2 />
                <FeatureCar />
                <Contact />
                <Tip />
                <Footer />
                <ContarctUi/>
            </div>
            <Cart user={user} showCart={showCart} setShowCart={setShowCart} plan={plan}/>
        </div>
    )
}

export default Home
