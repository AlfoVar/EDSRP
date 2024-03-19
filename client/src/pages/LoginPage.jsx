import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, isAuthenticated, errors: AuthErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/daily');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        console.log(values)
        signin(values)
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className="bg-custom-bg-bluegrey max-w-md w-full p-10 rounded-md">
                <h1 className="text-2xl font-bold">Login</h1>
                {
                    AuthErrors.map((error, i) => (
                        <div className='bg-custom-bg-red p-2 m-1 text-center' key={i}>
                            {error}
                        </div>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <input type="email" {...register("email", { required: true })} className='w-full bg-custom-bg-white  text-gray-900 px-4  py-2 rounded-md m-2' placeholder='Email' />
                    {errors.email && (
                        <p className='bg-custom-bg-red'>correo de usuario requerido</p>
                    )}
                    <input type="password" {...register("password", { required: true })} className='w-full bg-custom-bg-white  text-gray-900 px-4  py-2 rounded-md m-2' placeholder='Contraseña' />
                    {errors.password && (
                        <p className='bg-custom-bg-red'>constraseña de usuario requerido</p>
                    )}
                    <button type='submit' className=''>Ingresar</button>
                </form>
            </div>

        </div>
    );
}

export default LoginPage;
