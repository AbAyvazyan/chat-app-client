import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom';
import ContentArea from './ContentArea';


type Props = {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    const location = useLocation();
    if (location.pathname === '/register') {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <div className='h-[100vh] flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 lg:w-[90%] lg:h-[90%] max-w-[1600px] w-full h-full md:max-h-[1000px] bg-neutral-800 rounded-md'>
                <ContentArea>
                {children}
                </ContentArea>
            </div>
        </div>
    )


}

export default Layout;