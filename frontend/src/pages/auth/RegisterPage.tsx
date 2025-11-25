// frontend/src/pages/auth/RegisterPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerRep } from "../../api/auth";

type MainRole = "CLOSER" | "SETTER" | "COLD_CALLER" | "BOTH";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mainRole, setMainRole] = useState<MainRole>("CLOSER");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      await registerRep({
        fullName,
        email,
        password,
        mainRole,
      });

      alert(
        "Cuenta creada correctamente. Ahora puedes iniciar sesión con tu email y contraseña."
      );
      navigate("/login");
    } catch (err: any) {
      setError(err?.message || "No se ha podido crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] text-neutral-500 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none bg-neutral-50 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            placeholder="Ej: Alejandro Silvestre"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[11px] text-neutral-500 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none bg-neutral-50 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[11px] text-neutral-500 mb-1">
            Rol principal
          </label>
          <select
            className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none bg-neutral-50 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            value={mainRole}
            onChange={(e) => setMainRole(e.target.value as MainRole)}
          >
            <option value="CLOSER">Closer</option>
            <option value="SETTER">Setter</option>
            <option value="COLD_CALLER">Cold Caller / SDR</option>
            <option value="BOTH">Setter + Closer</option>
          </select>
          <p className="text-[11px] text-neutral-400 mt-1">
            Esto ayuda a recomendarte ofertas acordes a tu perfil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-neutral-500 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none bg-neutral-50 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-500 mb-1">
              Repetir contraseña
            </label>
            <input
              type="password"
              className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none bg-neutral-50 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              placeholder="••••••••"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-100 px-3 py-2 text-[11px] text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-black text-white text-xs py-2.5 hover:bg-neutral-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="text-[11px] text-neutral-500 text-center mt-3">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-neutral-900 font-medium underline underline-offset-2"
        >
          Inicia sesión
        </button>
      </p>
    </form>
  );
}

