import {FC,  useCallback} from 'react';
import {IoMdSend} from 'react-icons/io';

import socket from '../../../lib/socket';
import useLocalStorage from "../../../hooks/useLoaclStorage";

type Props = {
    clientId: string;
}

const ChatInput: FC<Props> = ({clientId}) => {
    const {value} = useLocalStorage<any>('user', {})

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();
        if (!e.target.chat.value.trim()) return;
        const message = {
            text: e.target.chat.value,
            userId: clientId,
            user: {
                username: value.username,
            },
        }
        socket.emit("addMessage", message);
        e.target.chat.value = '';
    }, [value, clientId])

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