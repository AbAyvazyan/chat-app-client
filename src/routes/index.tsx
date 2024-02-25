import {Routes, Route} from 'react-router-dom';
import Chat from '../pages/Chat';
import Register from '../pages/Register';

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/chat' element={<Chat/>}/>
        </Routes>
    )
}

export default Index;