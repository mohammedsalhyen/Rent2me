import { IoMdExit } from "react-icons/io";
import getStripe from '../lib/getStripe';
import { planQuery } from "@/utils/data";
import { client } from "@/lib/client";
import { useStateContext, IStateContext } from "@/context/StateContext";
const Cart = () => {
    const { user, showCart, plan, setShowCart } = useStateContext() as IStateContext;
    const handleCheckout = async () => {
        const planData=[plan]
        const stripe = await getStripe();
        const response = await fetch('/api/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planData),
        });
        console.log(plan)
        const data = await response.json();
        stripe.redirectToCheckout({ sessionId: data.id });
    }
    
    return (
        <div>
            {showCart &&
                <div data-aos="fade-left"  className='bg-white fixed z-40 top-0 right-0 xs:w-full lg:w-1/3'>
                    <div className=' main-prop max-container px-5 h-[100vh] relative text-black'>
                        <div className='flex justify-between items-center '>
                            <p className='text-[var(--blue-color)] text-xl font-bold'>Your Information</p>
                            <button
                                type='button'
                                title='Exit'
                                onClick={() => setShowCart(false)}
                                className=' text-red-500 text-lg bg-[#EEE] flex-center w-[40px] h-[40px] rounded-full'>
                                <IoMdExit />
                            </button>
                        </div>
                        <div className=' text-black flex flex-col gap-y-2 text-lg py-5'>
                            <p>Name : {user.name}</p>
                            <p>National Id : {user.nationalID}</p>
                            <p>Email : {user.mail}</p>
                            <p>Address : {user.address}</p>
                            <p>Phone : {user.phone}</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p className='text-[var(--blue-color)] text-xl font-bold'>you will join with:</p>
                            <p className='text-[var(--blue-color)] text-xl font-bold'>{plan.price == "50" ? "Light" : plan == "100" ? "Super" : "Altra"}</p>
                        </div>
                        <div className=' absolute bottom-3 w-full px-10' >
                            <div className='flex justify-between items-center '>
                                <p className='text-[var(--blue-color)] text-xl font-bold'>Total amount</p>
                                <p className='text-[var(--blue-color)] text-xl font-bold'>{plan.price}$</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCheckout}
                                className='text-white w-full mt-5 bg-[var(--orange-color)] rounded-3xl py-3  px-6 border-none flex-center' >
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart