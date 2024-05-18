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
import {IStateContext, useStateContext } from '@/context/StateContext'

const Home = () => {
    const { user, setUser} = useStateContext() as IStateContext;
    useEffect(() => {
        // Function to get data from local storage
        const getDataFromLocalStorage = () => {
            const userJson = localStorage.getItem('user');
            if ( !user &&userJson !== null) {
                const localStorageData = JSON.parse(userJson);
                setUser(localStorageData);
            }
        }
        getDataFromLocalStorage();
    }, []);

    return (
        <div>
            <div className=' relative' >
                <Landing />
                <Ad />
                <Subscription  />
                <About />
                <Ad2 />
                <FeatureCar user={user}/>
                <Contact />
                <Tip />
                <Footer />
            </div>
            <Cart/>
        </div>
    )
}

export default Home
