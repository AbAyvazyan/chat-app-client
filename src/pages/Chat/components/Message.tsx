import {FC} from 'react'

type Props = {
    message: Message;
}

const Message: FC<Props> = ({message}) => {
    const user: any = {}

    return (
        <div
            className={`
                rounded-md w-fit p-3 m-3 flex flex-col relative group
                ${message.userId === user?.id ? 'bg-cyan-600 ml-auto' : 'bg-neutral-900'}
            `}
        >
            <div
                className={`flex justify-between  ${message.userId === user?.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                <p className='mr-3'>{message.user?.username !== user?.username && message.user?.username}</p>
            </div>
            <p>{message.text}</p>

        </div>
    )
}

export default Message;