import {Dispatch, FC, SetStateAction} from 'react';
import {IoMdSend} from 'react-icons/io';

import socket from '../../../lib/socket';

type Props = {
    setMessages: Dispatch<SetStateAction<any>>;
}

const ChatInput: FC<Props> = ({setMessages}) => {

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target.chat.value) return;
        const message = {
            text: e.target.chat.value,
            userId: 'user?.id',
            user: {
                username: 'username',
            },
        }
        setMessages(message)
        socket.on('addMessage', (message) => {
            console.log(message,'/////////////')
        });
        e.target.chat.value = '';
    };

    return (
        <form onSubmit={handleSubmit} method="POST"
              className='w-full mt-auto bg-neutral-900 p-3 sticky bottom-0 border-t border-neutral-700'>
            <div className='flex justify-around items-center'>
                <input
                    spellCheck='false'
                    type="text"
                    name='chat'
                    className="bg-neutral-800 rounded-lg w-[90%] h-10 outline-none p-2"
                />
                <button type='submit'>
                    <IoMdSend className='text-2xl hover:text-neutral-300 duration-200'/>
                </button>
            </div>
        </form>
    )
}

export default ChatInput;