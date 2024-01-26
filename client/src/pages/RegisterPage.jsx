import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, errors:AuthErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/cierre');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                AuthErrors.map((error, i)=>(
                    <div className='bg-red-600 p-2' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="text" {...register("userName", { required: true })} className='w-full bg-zinc-700  text-white px-4  py-2 rounded-md m-2' placeholder='Nombre De Usuario' />
                {errors.userName && (
                    <p className='text-red-600'>nombre de usuario requerido</p>
                )}
                <input type="email" {...register("email", { required: true })} className='w-full bg-zinc-700  text-white px-4  py-2 rounded-md m-2' placeholder='Email' />
                {errors.email && (
                    <p className='text-red-600'>correo de usuario requerido</p>
                )}
                <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700  text-white px-4  py-2 rounded-md m-2' placeholder='Contraseña' />
                {errors.password && (
                    <p className='text-red-600'>constraseña de usuario requerido</p>
                )}
                <button type='submit' className=''>Registrarse</button>
            </form>
        </div>
    );
}

export default RegisterPage;
