import { z } from 'zod';

export const registerSchema = z.object({
    userName: z.string({
        required_error: "El usuario es requerido"
    }),
    email: z.string({
        required_error: "el correo es requerido"
    })
    .email({
      message: "Email no valido",
    }),
    password: z.string({
        required_error: "Contraseña requerida"
    }).min(6, {
        message: "La contraseña debe tener minimo 6 caracteres"
    })
})

export const loginSchema = z.object({
    email: z.string().email({message:"El correo no es valido"}),
    password: z.string().min(6,{message: "Formato de contraseña no valido"}),
});