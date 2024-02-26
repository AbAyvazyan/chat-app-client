import RegisterForm from './components/RegisterForm';

const Register = () => {
  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <div className='py-10 md:py-5 w-full h-full sm:h-auto sm:w-[400px] bg-neutral-800 shadow-lg rounded-md text-white'>
              <h1 className='text-3xl font-semibold text-center sm:hidden mb-10'>Create Account</h1>
              <RegisterForm  />
      </div>
    </div>
  );
};

export default Register;
