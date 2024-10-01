import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import MoodIcon from '@mui/icons-material/Mood';
import RemoveIcon from '@mui/icons-material/Remove';
import ChatIcon from '@mui/icons-material/Chat';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { Tooltip } from '@mui/material';
import Cookies from 'js-cookie';

import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getInfoChatBox } from '../../api/messageService';
import ChatAdmin from './components/ChatAdmin';
import ChatBot from './components/ChatBot';
import { API_URL } from '../../constants/baseURL';
export default function UserChatbox() {

    const [openChat, setOpenChat] = useState(false)
    const [openChatBot, setOpenChatBot] = useState(false)
    const [openChatAdmin, setOpenChatAdmin] = useState(false)
    const [messagesBot, setMessagesBot] = useState(false)
    const [messagesAdmin, setMessagesAdmin] = React.useState([]);
    const [privateStompClient, setPrivateStompClient] = useState(null);
    const [infoChatBox, setInfoChatBox] = useState({ seen: true });
    const { userInfo, isAuthenticated } = useSelector(state => state.user);
    const openChatAdminRef = useRef(openChatAdmin);
    const sendPrivateMessage = () => {
        if (privateStompClient && isAuthenticated && infoChatBox) {
            const message = JSON.stringify({ id: infoChatBox?.idChatBox, userId: userInfo.id, name: userInfo.name, image: userInfo.picture, isSeen: false })
            console.log({ text: message, to: infoChatBox.idAdmin })
            privateStompClient.send("/app/private", {}, JSON.stringify({ text: message, to: infoChatBox.idAdmin }));
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                const res = await getInfoChatBox();
                setInfoChatBox(res);
            })()
        }
    }, [isAuthenticated])
    useEffect(() => {
        openChatAdminRef.current = openChatAdmin;
    }, [openChatAdmin]);
    useEffect(() => {
        if (isAuthenticated) {
            const accessToken = Cookies.get('accessToken');
            const privateSocket = new SockJS(API_URL + `/ws?access_token=${accessToken}`);
            const privateStomp = Stomp.over(privateSocket);
            privateStomp.connect({}, (frame) => {
                console.log("Connected to private channel: " + frame);
                privateStomp.subscribe("/user/specific", (data) => {
                    if (openChatAdminRef.current === true) {
                        const mess = JSON.parse(data.body);
                        setMessagesAdmin((prevMessagesAdmin) => [...prevMessagesAdmin, mess]);
                    } else {
                        setOpenChatAdmin((openChatAdminPrev) => true);
                    }
                    setInfoChatBox((infoChatBoxPrev) => {
                        return { ...infoChatBoxPrev, seen: true }
                    });
                });
            });
            setPrivateStompClient(privateStomp);

        }
        return () => {
            if (privateStompClient) privateStompClient.disconnect();
        };
    }, [isAuthenticated])
    return (
        <div className='fixed  bottom-0 right-0 z-50'>
            <div className='flex items-end'>
                <div className='flex items-end gap-5'>
                    {openChatAdmin ? <ChatAdmin messages={messagesAdmin} setMessages={setMessagesAdmin} setOpen={setOpenChatAdmin} sendPrivateMessage={sendPrivateMessage} /> : ""}
                    {openChatBot ? <ChatBot /> : ""}
                </div>

                <div className='pb-4 pr-4 ml-[20px]'>
                    {openChat ? <>
                        {isAuthenticated ? <Tooltip title="Chat with admin" placement="top">

                            <div onClick={() => {
                                setOpenChatAdmin(!openChatAdmin)
                                setInfoChatBox({ ...infoChatBox, seen: true });
                            }} className='relative mb-[10px] bg-white w-[55px] border-4 border-black h-[55px] rounded-full flex items-center justify-center  hover:opacity-80 cursor-pointer '>
                                <ChatIcon />
                                {!infoChatBox.seen ? <div className='absolute -top-2 -right-1 w-[25px] h-[25px] bg-red-600 rounded-full flex items-center justify-center font-bold text-white'>1</div> : ""}

                            </div>
                        </Tooltip> : ""}

                        <Tooltip title="Chat with bot" placement="top">
                            <div onClick={() => setOpenChatBot(!openChatBot)} className={' border-4 border-black mb-[10px] bg-white w-[55px] h-[55px] rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer'}>
                                <QuickreplyIcon />
                            </div>
                        </Tooltip>
                    </> : ""}
                    <div onClick={() => setOpenChat(!openChat)} className=' relative bg-blue-600 w-[55px] h-[55px] rounded-full flex items-center justify-center text-white hover:opacity-80 cursor-pointer '>
                        {openChat ? <RemoveIcon /> : <AddIcon />}
                        {!infoChatBox.seen ? <div className='absolute top-0 right-0 w-[25px] h-[25px] bg-red-600 rounded-full flex items-center justify-center font-bold'>1</div> : ""}
                    </div>
                </div>
            </div>

        </div>
    )
}
