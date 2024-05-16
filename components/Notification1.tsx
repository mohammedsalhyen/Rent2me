import React, { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";
import ContarctUi from './CotractUi';
const Notification1 = ({ notifications }: any) => {
  const [show, setShow] = useState(false);
  console.log(notifications)
  const handleMarkAsRead = async (item: any) => {
    try {
      const response = await fetch(`http://rent2me.runasp.net/Notification/mark-as-read/?notificationId=${item}`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log('Sendding successful:');
        alert("marked");

      } else {
        console.error('sending failed:', response.statusText);
        alert("false");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className=' absolute top-24  right-0 z-40 bg-white w-96   rounded-lg m-h-full max-h-screen'>
      <div className=' flex items-center justify-between text-xl px-2 py-7 font-bold border-b-2 pb-2'>
        <p className=''>Your Notification</p>

      </div>
      {notifications.map((notification: any, index: number) => (
        <div key={index} className={`${notification.isRead ? "bg-[#fff]" : "bg-[#DDD]"}  h-[100px] w-full  flex items-center justify-between gap-5  border-y-2 px-2`}>
          <p className=' font-bold flex-1'>
            {notification.message}
          </p>
          <div className='w-fit flex-center'>
            {
              notification.message === "Your rental request has been accepted,see requests for more details." ?
                <button className='py-2 px-3 rounded-3xl bg-[var(--blue-color)] text-white'
                  onClick={() => setShow(true)}
                >Pay Now</button> : ""
            }
            <button type='button'
              className='bg-[rgb(221,221,221)] text-2xl w-8 h-8 rounded-full px-2 flex-center'
              onClick={() => {
                if (!notification.isRead) {
                  handleMarkAsRead(notification.notificationId);
                }
              }}
            >
              <IoIosCheckmarkCircle />
            </button>

          </div>
          {show &&
            <div data-aos="zoom-in" className='bg-[#000000ad] fixed top-0 left-0 w-full h-full z-30 '>
              <div className=' font-normal absolute py-10 px-5 rounded-3xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-50'>
                <ContarctUi setShow={setShow} />
              </div>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

export default Notification1
