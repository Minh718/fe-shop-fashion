import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Outlet, Route, Routes, useLoaderData } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Header from '../common/header';
import Footer from '../common/footer';
import UserChatbox from '../common/userChatbox';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_URL } from '../constants/baseURL';
import { Avatar } from '@mui/material';
import { notifyOrderSuccess } from '../common/toastNotify/toastNotify';

export default function Home() {
  useEffect(() => {
    const privateSocket = new SockJS(API_URL + `/ws`);
    const stompClient = Stomp.over(privateSocket);
    stompClient.connect({}, (frame) => {
      stompClient.subscribe("/topic/order-notification", (data) => {
        const notification = JSON.parse(data.body);
        const comp = <div className='flex gap-2 justify-between'>
          <img alt='avatar' src={notification.picture || "./avatar.jpg"} className='w-[50px] h-[50px] rounded-full object-cover' />
          <p>{notification.message}</p>
        </div>
        notifyOrderSuccess(comp);
      });
    });

    return () => stompClient.disconnect();
  }, [])
  return (
    <>
      <div className='relative'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <UserChatbox />
      </div>
      <ToastContainer />
    </>
  );
}