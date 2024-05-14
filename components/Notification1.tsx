import React, { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";
const Notification1 = ({ notifications }: any) => {
  console.log(notifications)
  const handleMarkAsRead = async (item: any) => {
    try {
      const response = await fetch(`http://rent2me.runasp.net/Notification/mark-as-read/?notificationId=${item}`,{
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
      <button className='bg-[rgb(221,221,221)] text-2xl w-8 h-8 rounded-full px-2 flex-center'>
        <IoIosCheckmarkCircle />
      </button>
    </div>
    {notifications.map((notification: any, index: number) => (
      <div key={index}>
        <button className={`${notification.isRead ? "bg-[#fff]" : "bg-[#DDD]"}  h-[100px] w-full  flex items-center text-lg font-bold border-y-2 px-2`}
          onClick={() => {
            if (!notification.isRead) {
              handleMarkAsRead(notification.notificationId);
            }
          }}
        >
          {notification.message}
        </button>
      </div>
    ))}
  </div>
)
}

export default Notification1
