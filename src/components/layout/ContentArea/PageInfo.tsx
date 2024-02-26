import {FC} from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {User} from "../../../utils/types";
import useLocalStorage from "../../../hooks/useLoaclStorage";

type Props = {
    name: string;
}


const PageInfo: FC<Props> = ({ name}) => {
    const {value} = useLocalStorage<User>('user', {username: ''})

    return (
        <div
            className={`text-2xl flex items-center px-5 w-full sticky z-50 top-0 bg-neutral-900 border-b border-neutral-700`}>
            {
                value.image
                &&
                <LazyLoadImage
                    src={value.image}
                    alt='channel-pp'
                    effect='blur'
                    className='w-16 h-16 rounded-full mx-3 lg:mx-5 object-cover'
                />
            }
            <div className='max-h-16 xl:w-96 lg:w-80 md:w-52 sm:w-36 w-32 overflow-hidden'>
                <p className='hidden md:block'>{name}</p>
                <p className='md:hidden'>{name}</p>
            </div>

        </div>
    )
}

export default PageInfo