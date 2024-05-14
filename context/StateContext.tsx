import React, { createContext, useContext, useState } from 'react';
import { BsFillNutFill } from 'react-icons/bs';

export interface IStateContext {
    user: any;
    setUser: (user: any) => void;
    showCart: boolean;
    setShowCart: (show: boolean) => void;
    plan: any;
    setPlan: (plan: any) => void;
    carDetail: any;
    setCarDetail: (carDetail: any) => void;
}

const Context = createContext<IStateContext | null>(null);

export const StateContext = ({ children }:any) => {
    const [user, setUser] = useState();
    const [showCart, setShowCart] = useState(false);
    const [plan, setPlan] = useState();
    const [carDetail,setCarDetail] = useState();
    return (
        <Context.Provider value={{ user, setUser,showCart, setShowCart,plan, setPlan,carDetail,setCarDetail }}>
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);