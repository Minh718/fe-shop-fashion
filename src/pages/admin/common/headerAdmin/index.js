import { Avatar, Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

import { Stomp } from '@stomp/stompjs';
import { getChatBoxListUnSeenByAdmin } from '../../../../api/messageService';
import { Link } from 'react-router-dom';
import { API_URL, baseURL } from '../../../../constants/baseURL';

export default function HeaderAdmin({ setChatbox, setPrivateStompClient, privateStompClient }) {
    const [chatBoxs, setChatBoxs] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [numNewChat, setNumNewChat] = React.useState(0);
    const accessToken = Cookies.get('accessToken');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenChatBox = (chatBox) => {
        setChatbox(chatBox)
        if (chatBox.isSeen === false) setNumNewChat(numNewChat - 1)
        setChatBoxs(chatBoxs.map((item) => (item.id === chatBox.id ? { ...item, isSeen: true } : item)))
        handleClose();
    }
    useEffect(() => {
        const privateSocket = new SockJS(API_URL + `/ws?access_token=${accessToken}`);
        const privateStomp = Stomp.over(privateSocket);

        privateStomp.connect({}, (frame) => {
            privateStomp.subscribe("/user/specific", (result) => {
                const chatBox = JSON.parse(result.body);

                setChatBoxs((prevChatBoxs) => {
                    const chatBoxExists = prevChatBoxs.find(item => item.id === chatBox.id);
                    if (chatBoxExists) {
                        if (chatBoxExists.isSeen === true) {
                            setNumNewChat(prevNum => prevNum + 1);
                        }
                        return prevChatBoxs.map(item => (item.id === chatBox.id ? chatBox : item));
                    } else {
                        setNumNewChat(prevNum => prevNum + 1);
                        return [chatBox, ...prevChatBoxs];
                    }
                });
            });
        });

        setPrivateStompClient(privateStomp);

        // Cleanup function to disconnect when component unmounts
        return () => {
            if (privateStompClient) {
                privateStompClient.disconnect();
            }
        };
    }, []);
    useEffect(() => {
        getChatBoxListUnSeenByAdmin().then((res) => {
            setChatBoxs(res)
            setNumNewChat(res.length)
        })
    }, [])
    return (
        <div className='flex justify-center border-b-2'>
            <div className='w-[90%]  px-2 max-w-[1200px] h-[80px]'>
                <div className='flex justify-between items-center h-full'>
                    <div >
                        <img src="/logo.png" alt="??" className='w-[100px]' />
                    </div>
                    <div className='flex items-center' >
                        <div >
                            <NotificationsIcon fontSize='large' />
                        </div>
                        <div className='px-3 cursor-pointer relative' onClick={handleClick}>
                            <ChatIcon fontSize='large' />
                            <div className='w-[20px] h-[20px] rounded-full bg-red-600 absolute top-0 right-2 font-bold flex items-center justify-center text-white'>{numNewChat}</div>
                        </div>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {chatBoxs.length === 0 ? <MenuItem> No waiting messages</MenuItem> :
                                chatBoxs.map((chatBox) => (
                                    <MenuItem key={chatBox.id} onClick={() => {
                                        handleOpenChatBox(chatBox)
                                    }}>
                                        <div className='flex items-center justify-between w-[300px] p-2'>
                                            <div className='flex items-center gap-5'>
                                                <Avatar alt="Remy Sharp" src={chatBox.image} />
                                                <div>{chatBox.name}</div>
                                            </div>
                                            {!chatBox.isSeen ? <div className='w-[10px] h-[10px] rounded-full bg-red-600'></div> : ''}
                                        </div>
                                    </MenuItem>
                                ))}
                            <Link className='flex justify-center hover:underline' onClick={handleClose}>View all</Link>
                        </Menu>
                        <Avatar alt="Remy Sharp" src="/logo.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}
