import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-black text-white px-6 py-3 hover:bg-black/90 shadow-sm active:scale-[0.99]",
    ghost:
      "bg-transparent text-neutral-700 px-4 py-2 hover:bg-black/5 border border-transparent",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
