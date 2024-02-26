import {FC} from 'react'
import useLocalStorage from "../../../hooks/useLoaclStorage";
import {TMessage} from "../../../utils/types";

type Props = {
    message: TMessage;
}

const Message: FC<Props> = ({message}) => {
    const {value} = useLocalStorage<any>('user', {})

    return (
        <div
            className={`
                rounded-md w-fit p-3 m-3 flex flex-col relative group
                ${message.user?.username === value.username ? 'bg-cyan-600 ml-auto' : 'bg-neutral-900'}
            `}
        >
            <div
                className={`flex justify-between  ${message.user?.username === value.username ? 'text-neutral-300' : 'text-neutral-400'}`}>
                <p className='mr-3'>{message.user?.username !== value.username ? message.user?.username : 'Me'}</p>
            </div>
            <p>{message.text}</p>

        </div>
    )
}

export default Message;