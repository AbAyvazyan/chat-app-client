import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom';

import PageInfo from '../../components/layout/ContentArea/PageInfo';
import Spinner from '../../components/loading/Spinner';
import useChatScroll from '../../hooks/useChatScroll';
import socket from "../../lib/socket";
import ChatInput from './components/ChatInput';
import Message from './components/Message';

const Chat = () => {
    const user: any = {}

    const [messages, setMessages] = useState<Message[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const ref = useChatScroll(messages);


    useEffect(() => {
        // const socket = io(API_BASE_URL, {path: '/messages', transports: ['websocket', 'polling'],})
        socket.connect()

        socket.on('getAllMessages', (allMessages) => {
            setMessages(allMessages);
        });

        socket.emit('message', {name: 'Nest'});

        return () => {
            socket.off('getAllMessages');
            socket.disconnect()
        };
    }, []);

    const addNewMessageHandler = (message: any) => {
        setIsPending(true)
        setMessages(prevState => [...prevState, message])
        setIsPending(false)
    }


    return (
        <section className='h-full relative overflow-hidden'>
            <PageInfo
                isChannel={true}
                name={'Room'}
                participants={null}
                image={'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'}
            />
            <div ref={ref} className='flex flex-col overflow-x-hidden overflow-y-auto pb-10 h-[85%] scroll-smooth'>
                {
                    !isPending
                        ?
                        (messages && messages.length > 0)
                            ?
                            messages.map((message, index) => {
                                return <Message key={index} message={message}/>
                            })
                            :
                            <p className='bg-cyan-600 p-3 m-2 rounded-md text-center'>There is no any messages yet.</p>
                        :
                        <Spinner size='lg'/>
                }
            </div>
            <ChatInput setMessages={addNewMessageHandler}/>
        </section>
    )
}

export default Chat;