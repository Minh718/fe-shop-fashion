import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HeaderAdmin from '../common/headerAdmin'
import SideBar from '../common/sidebar'
import { adminGetMessages, adminSendMessage } from '../../../api/messageService'
import { notifyError } from '../../../common/toastNotify/toastNotify'
import BoxChat from '../../../common/userChatbox/components/BoxChat'
export default function Admin() {

    const [chatBox, setChatbox] = React.useState(null)
    const [messages, setMessages] = React.useState([])
    const [privateStompClient, setPrivateStompClient] = useState(null);

    const [size, setSize] = React.useState(10)
    const handleSendMessage = async (message) => {
        try {
            const data = await adminSendMessage({ message, chatBoxId: chatBox?.id });
            setMessages([...messages, data]);
            sendPrivateMessage(data);
        } catch (err) {
            notifyError("Error occured")
        }
    }
    const sendPrivateMessage = (data) => {
        if (privateStompClient && chatBox) {
            console.log({ text: "message", to: chatBox.userId })
            privateStompClient.send("/app/private", {}, JSON.stringify({ text: JSON.stringify(data), to: chatBox.userId }));
        }
    };
    useEffect(() => {
        if (chatBox) {
            (async () => {
                try {
                    const data = await adminGetMessages({ size, chatBoxId: chatBox?.id });
                    setMessages(data.reverse());

                } catch (err) {
                    notifyError("Error occured")
                }
            })();
        }
    }, [chatBox, size])
    useEffect(() => {
        let intervalId;

        // If chatBox is not null, set up the interval and fetch data
        if (chatBox) {
            const fetchMessages = async () => {
                try {
                    const data = await adminGetMessages({ size, chatBoxId: chatBox?.id });
                    setMessages(data.reverse());
                } catch (err) {
                    notifyError("Error occurred");
                }
            };

            fetchMessages(); // Fetch messages immediately

            // Set interval to fetch messages every 5 seconds
            intervalId = setInterval(fetchMessages, 5000);
        }

        // Cleanup: Clear the interval when chatBox changes or becomes null
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [chatBox, size]);


    return (
        <>
            <div className='grid grid-cols-12 text-[#575454] relative'>
                <SideBar />
                <div className='bg-[#FAFAFA] col-span-10'>
                    <HeaderAdmin setChatbox={setChatbox} privateStompClient={privateStompClient} setPrivateStompClient={setPrivateStompClient} />

                    <main className='px-8 py-3'>
                        <div className='flex justify-center'>
                            <div className='w-full max-w-screen-xl'>
                                <Outlet />
                            </div>
                        </div>

                    </main>
                </div>
                <div className='fixed right-0 bottom-0 z-50'>
                    {chatBox ? <BoxChat handleSendMessage={handleSendMessage} messages={messages} name={chatBox.name} image={chatBox.image} setOpen={setChatbox} size={size} setSize={setSize} /> : ''}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
