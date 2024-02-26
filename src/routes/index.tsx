import {Routes, Route, useNavigate} from 'react-router-dom';
import Chat from '../pages/Chat';
import Register from '../pages/Register';
import useLocalStorage from "../hooks/useLoaclStorage";
import {useEffect} from "react";

const Index = () => {
    const navigate = useNavigate()
    const {value} = useLocalStorage<any>('user', {})
    useEffect(()=>{
        if (!value.username) {
            navigate('/')
        }
    },[])

        return (
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
        )
}

export default Index;
