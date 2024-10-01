import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { convertDateTimeFlexibly } from '../../../utils';
import { Avatar } from '@mui/material';
export default function BoxChat({ setSize, size, messages, name, image = "avatar.jpg", setOpen, handleSendMessage }) {
    const { userInfo } = useSelector(state => state.user);
    const messagesEndRef = useRef(null);
    const messagesBeginRef = useRef(null);
    const [isViewMore, setIsViewMore] = React.useState(false);
    const [message, setMessage] = React.useState('');
    // Cuộn tới phần tử cuối cùng mỗi khi messages thay đổi
    const handleMessage = () => {
        if (message?.trim() === '') return;
        handleSendMessage(message);
        setMessage('');
        setIsViewMore(false);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleMessage();
            // You can add any additional logic you want here
        }
    };
    useEffect(() => {
        if (messagesEndRef.current && messagesBeginRef.current) {
            if (isViewMore) {
                messagesBeginRef.current.scrollIntoView();
            } else {
                messagesEndRef.current.scrollIntoView();
            }
        }
    }, [messages]);

    return (
        <div className='bg-white w-[330px] h-[400px] rounded-lg shadow-lg'>
            <div className='flex flex-col h-full'>
                <div className='flex items-center justify-between py-2 px-4 border-b'>
                    <div className='flex items-center gap-2'>
                        {/* <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                            {name}
                        </div> */}
                        <Avatar alt="Remy Sharp" src={image} />
                        <div className='text-lg font-bold'>{name}</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-6 h-6 rounded-full bg-green-500'></div>
                        <div className='w-6 h-6 rounded-full bg-yellow-500'></div>
                        <div className='w-6 h-6 rounded-full bg-red-500 cursor-default' onClick={() => setOpen(null)}></div>
                    </div>
                </div>
                <div className='flex-1 overflow-y-auto px-4 pt-2 pb-1'>
                    <div ref={messagesBeginRef}></div>
                    {messages?.length === 0 ? <div className='text-center'>No messages</div> : messages.length >= size ? <div onClick={() => {
                        setSize(size + 7)
                        setIsViewMore(true);
                    }} className='text-center text-[14px] cursor-pointer hover:underline mb-2'>View more</div> : ''}
                    {messages?.map((message, index) => (
                        <div key={index} className={`flex gap-2 mt-1 ${(message.idSend === userInfo.id) ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 rounded-lg ${(message.idSend === userInfo.id) ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>{message.message}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                    {messages?.length !== 0 ? <div className='text-center opacity-70 text-[14px]  flex justify-end'>{convertDateTimeFlexibly(messages[messages.length - 1].createdAt)}</div> : ''}
                </div>
                <div className='flex items-center gap-2 p-4 border-t'>
                    <input type="text" placeholder="Type a message" onKeyDown={handleKeyDown} value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 p-2 rounded-full border outline-none' />
                    <button onClick={handleMessage} className='bg-blue-500 text-white px-4 py-2 rounded-full'><SendIcon /></button>
                </div>
            </div>
        </div>
    )
}
