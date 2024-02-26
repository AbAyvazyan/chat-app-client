import {ChangeEvent, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {HiUser} from 'react-icons/hi';
import toast, {Toaster} from 'react-hot-toast';

import TextInput from '../../../components/inputs/TextInput';
import BasicButton from '../../../components/buttons/BasicButton';
import {createAccount} from '../../../services/authService';
import useLocalStorage from "../../../hooks/useLoaclStorage";
import {User} from "../../../utils/types";
import {IoMdCloudUpload} from "react-icons/io";



const RegisterForm = () => {
    const navigate = useNavigate();
    const {setStoredValue} = useLocalStorage<User>('user', {username: ''})
    const [base64File, setbase64File] = useState<string>('')
    const [file, setFile] = useState<Blob | null>(null);

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setbase64File(base64String);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }

    };


    const onSubmit = useCallback(async (data: any) => {

        const response = await createAccount({...data, image: file});

        if (response.data) {
            const imageData = response.data.image;
            const imageType = imageData.type;

            const uint8Array = new Uint8Array(imageData.data);
            let binaryString = '';
            uint8Array.forEach(byte => {
                binaryString += String.fromCharCode(byte);
            });
            const base64Image = window.btoa(binaryString);

            const dataUrl = `data:${imageType};base64,${base64Image}`;

            setStoredValue({...response.data,image:dataUrl})
            navigate('/chat')
        }

        reset();
        toast.error(response.message, {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    }, [file,navigate,reset,setStoredValue])

    return (
        <form
            method='POST'
            name='form'
            onSubmit={handleSubmit(onSubmit)}
        >

            <div
                className="w-[50%] md:w-[50%] mx-auto h-[170px] border border-solid border-white rounded-lg">
                {base64File ?
                    <img className='w-[100%] h-[100%] rounded-lg' src={base64File} alt='avatar'/>
                    :
                    <label className='cursor-pointer w-[100%] h-[100%] flex justify-center items-center'>
                        <input type={'file'} className='hidden' onChange={handleFileChange}/>
                        <IoMdCloudUpload size={50}/>
                    </label>}


            </div>

            <TextInput
                label='Username'
                placeholder='Type your username.'
                Icon={HiUser}
                error={errors.username && errors.username.message}
                informations={['username must be min 5.', 'username must be max 20.']}
                refs={{
                    ...register('username', {
                        required: 'username is required.',
                        minLength: {
                            value: 3,
                            message: 'username must be min 3 characters.'
                        },
                        maxLength: {
                            value: 20,
                            message: 'username must be max 20 characters.'
                        }
                    })
                }}
            />

            <div className='w-[90%] md:w-[80%] mx-auto'>
                <BasicButton
                    type='submit'
                >
                    Create Account
                </BasicButton>
            </div>
            <Toaster/>
        </form>
    );
};

export default RegisterForm;
