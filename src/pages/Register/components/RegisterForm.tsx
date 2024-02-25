import {useForm} from 'react-hook-form';
import {Dispatch, FC, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';
import {HiUser} from 'react-icons/hi';
import toast, {Toaster} from 'react-hot-toast';

import TextInput from '../../../components/inputs/TextInput';
import BasicButton from '../../../components/buttons/BasicButton';
import {createAccount} from '../../../services/authService';

type Props = {
    setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

const RegisterForm: FC<Props> = ({setIsFormOpen}) => {
    const navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = async (data: any) => {
        const response = await createAccount(data);

        if(response.data){
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
    };

    return (
        <form
            method='POST'
            name='form'
            onSubmit={handleSubmit(onSubmit)}
        >

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
