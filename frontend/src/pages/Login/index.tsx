import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.css";
import { loginSchema, type LoginFormData } from "../../schema/loginSchema";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    async function onSubmit(data: LoginFormData) {
        try {
            await login(data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1>Tickets System</h1>
                    <p>Bit Soluções · Painel de Gerenciamento</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <label>E-mail</label>

                        <input
                            type="email"
                            placeholder="seu@email.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Senha</label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="error-message">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button className="login-button" type="submit">
                        Entrar
                    </button>

                </form>
            </div>
        </div>
    );
}