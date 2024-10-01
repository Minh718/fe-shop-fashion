import React, { useEffect } from 'react'
import BoxChat from './BoxChat'
import { userGetMessages, userSendMessage } from '../../../api/messageService';
import { notifyError } from '../../toastNotify/toastNotify';


export default function ChatAdmin({ messages, setMessages, setOpen, sendPrivateMessage }) {
    const [size, setSize] = React.useState(10);
    const handleSendMessage = async (message) => {
        try {
            const res = await userSendMessage(message);
            setMessages([...messages, res]);
            sendPrivateMessage();
        } catch (err) {
            notifyError("Error occured")
        }

    }
    useEffect(() => {
        (async () => {
            try {
                const data = await userGetMessages(size);
                setMessages(data.reverse());

            } catch (err) {
                notifyError("Error occured")
            }
        })();
    }, [size])

    return (
        <BoxChat messages={messages} setSize={setSize} size={size} handleSendMessage={handleSendMessage} name="ADMIN" setOpen={setOpen} />
    )
}
