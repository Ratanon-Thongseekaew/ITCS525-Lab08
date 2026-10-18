import { useContext } from "react";
import ThemeContext from "../ThemeContext";

export default function Button({ children, onClick, variant = "number" }) {
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  const variantClasses = {
    number: isDark
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300",
    utility: isDark
      ? "bg-gray-500 text-white hover:bg-gray-400"
      : "bg-gray-300 text-gray-900 hover:bg-gray-400",
    operator: "bg-orange-500 text-white hover:bg-orange-400",
    toggle: isDark
      ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
      : "bg-white text-gray-800 hover:bg-gray-100",
  };

  const sizeClasses =
    variant === "toggle"
      ? "rounded-full px-4 py-2 text-sm font-medium shadow"
      : `h-16 w-16 rounded-full ${
          children === "Clear" ? "text-base" : "text-2xl"
        }`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses} flex items-center justify-center transition-colors`}
    >
      {children}
    </button>
  );
}
