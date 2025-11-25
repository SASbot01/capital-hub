import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({
  label,
  className = "",
  ...rest
}: InputProps) {
  return (
    <label className="block text-sm font-medium text-neutral-800">
      {label && <span className="mb-1 inline-block">{label}</span>}
      <div
        className={`
          mt-1
          flex items-center
          rounded-2xl
          border border-neutral-300
          bg-white
          px-4
          py-3
          focus-within:border-black
          focus-within:ring-1
          focus-within:ring-black/10
        `}
      >
        <input
          className={`w-full border-none outline-none bg-transparent text-sm placeholder:text-neutral-400 ${className}`}
          {...rest}
        />
      </div>
    </label>
  );
}
