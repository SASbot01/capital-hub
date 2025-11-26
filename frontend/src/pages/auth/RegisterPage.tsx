import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
// ❌ Eliminamos la importación directa de la API.
// 🟢 Importamos el hook de autenticación
import { useAuth } from "../../context/AuthContext";

// Definimos el tipo de rol principal para el REP (Setter, Closer, etc.)
// Esto no se envía al backend en el registro REP, pero es útil para el formulario.
type RepRole = "SETTER" | "CLOSER" | "COLD_CALLER" | "BOTH";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<RepRole>("SETTER"); // Inicializamos el rol, aunque el backend lo ignora en /signup/rep
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    // 🟢 Obtenemos la función de registro del contexto
    const { register: authRegister } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Simple validación
        if (!firstName || !lastName || !email || !password) {
            setError("Por favor, rellena todos los campos.");
            setLoading(false);
            return;
        }

        try {
            // 🟢 Usamos la función register del contexto.
            // El payload coincide con el SignupRequest.java corregido:
            const res = await authRegister({
                firstName,
                lastName,
                email,
                password,
            });

            // 🟢 Redirigimos basándonos en el rol que devuelve el Backend (debería ser REP)
            if (res.role === "REP") {
                navigate("/rep/dashboard");
            } else {
                // Caso de seguridad, aunque la ruta solo permite REP
                navigate("/login"); 
            }

        } catch (err: any) {
            setError(err?.message || "Error al registrarse. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Regístrate como Comercial</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* // Asumiendo que has actualizado el formulario para capturar nombre y apellido por separado
                // Si solo tienes un campo para nombre completo, necesitarías la lógica para dividirlo aquí.
                */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Nombre"
                        type="text"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Tu nombre"
                        required
                    />
                    <Input
                        label="Apellido"
                        type="text"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Tu apellido"
                        required
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tuemail@ejemplo.com"
                    required
                />

                <Input
                    label="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                />
                
                {/* Campo de Rol, manteniendo la UX aunque el backend lo ignore por la ruta /signup/rep */}
                <Input
                    label="Rol principal"
                    type="select" // Asumiendo que tienes un componente Input flexible o un Select aparte
                    value={role}
                    onChange={(e) => setRole(e.target.value as RepRole)}
                >
                    <option value="SETTER">Setter</option>
                    <option value="CLOSER">Closer</option>
                    <option value="BOTH">Setter & Closer (Ambos)</option>
                    <option value="COLD_CALLER">Cold Caller</option>
                </Input>

                {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-2xl px-3 py-2">
                        {error}
                    </p>
                )}

                <div className="mt-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Registrando..." : "Crear Cuenta"}
                    </Button>
                </div>
            </form>

            <div className="mt-4 text-center text-xs text-neutral-600">
                ¿Ya tienes cuenta?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="font-semibold text-neutral-900 hover:underline underline-offset-2"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}
