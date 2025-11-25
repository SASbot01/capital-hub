import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { login } from "../../api/auth";

type UserType = "rep" | "company";

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType>("rep");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);

      if (remember) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("userType", userType);
      } else {
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("userType", userType);
      }

      if (userType === "rep") {
        navigate("/rep/dashboard");
      } else {
        navigate("/company/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 p-8">
      <div className="flex mb-6 bg-neutral-100 rounded-full p-1">
        <button
          type="button"
          onClick={() => setUserType("rep")}
          className={`flex-1 py-2 text-sm font-medium rounded-full transition ${
            userType === "rep"
              ? "bg-white shadow-sm text-neutral-900"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Comercial
        </button>
        <button
          type="button"
          onClick={() => setUserType("company")}
          className={`flex-1 py-2 text-sm font-medium rounded-full transition ${
            userType === "company"
              ? "bg-white shadow-sm text-neutral-900"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Empresa
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tuemail@ejemplo.com"
        />

        <Input
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between text-xs text-neutral-600 mt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-neutral-300 text-black focus:ring-black/30"
            />
            <span>Recordarme</span>
          </label>
          <button
            type="button"
            className="text-neutral-500 hover:text-neutral-800 underline-offset-2 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-2xl px-3 py-2">
            {error}
          </p>
        )}

        <div className="mt-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center text-xs text-neutral-600">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="font-semibold text-neutral-900 hover:underline underline-offset-2"
        >
          Regístrate
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] text-neutral-500 text-center">
        Demo: usa <span className="font-mono">admin@capitalhub.com</span> para acceso
        admin
      </div>
    </div>
  );
}

