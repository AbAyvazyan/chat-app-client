import {useEffect, useState} from 'react'
import PageInfo from '../../components/layout/ContentArea/PageInfo';
import useChatScroll from '../../hooks/useChatScroll';
import socket from "../../lib/socket";
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import useLocalStorage from "../../hooks/useLoaclStorage";
import {TMessage} from "../../utils/types";

const Chat = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);
    const ref = useChatScroll(messages);
    const {value, setStoredValue} = useLocalStorage<string>('socketId', '')

    useEffect(() => {
        socket.connect()

        socket.on('connect', () => {
            setStoredValue(socket.id)
        });

        socket.on('allMessages', (allMessages: any) => {
            setMessages(allMessages);
        });

        return () => {
            socket.off('allMessages');
            socket.disconnect()
        };
    }, [setStoredValue]);

    return (
        <section className='h-full relative overflow-hidden'>
            <PageInfo
                name={'Room'}
            />
            <div ref={ref} className='flex flex-col overflow-x-hidden overflow-y-auto pb-10 h-[85%] scroll-smooth'>
                {
                    (messages && messages.length > 0)
                        ?
                        messages.map((message: TMessage, index: number) => {
                            return <Message key={index} message={message}/>
                        })
                        :
                        <p className='bg-cyan-600 p-3 m-2 rounded-md text-center'>There is no any messages yet.</p>
                }
            </div>
            <ChatInput clientId={value}/>
        </section>
    )
}

export default Chat;
