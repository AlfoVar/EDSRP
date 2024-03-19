import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: AuthErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-custom-bg-bluegrey max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Registro de un nuevo usuario</h1>
        {AuthErrors.map((error, i) => (
          <div className="bg-red-600 p-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("userName", { required: true })}
            className="w-full bg-zinc-700  text-white px-4  py-2 rounded-md m-2"
            placeholder="Nombre De Usuario"
          />
          {errors.userName && (
            <p className="bg-custom-bg-red">nombre de usuario requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700  text-white px-4  py-2 rounded-md m-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="bg-custom-bg-red">correo de usuario requerido</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700  text-white px-4  py-2 rounded-md m-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="bg-custom-bg-red">constraseña de usuario requerido</p>
          )}
          <button type="submit" className="">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
