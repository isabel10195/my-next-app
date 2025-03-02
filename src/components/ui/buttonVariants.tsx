// src/components/ui/button.tsx

import * as React from "react";
import { cn } from "@/components/lib/utils";  // Asegúrate de tener esta utilidad para concatenar clases

// Variantes de los botones
export const buttonVariants = ({
  variant = "default",
  size = "medium",
}: {
  variant?: "default" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
}) => {
  const baseStyles = "rounded-md font-semibold focus:outline-none transition-all";

  // Estilos de variantes
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-100",
  };

  // Estilos de tamaño
  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return cn(baseStyles, variantStyles[variant], sizeStyles[size]);
};

// Botón principal

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'medium',
  ...props
}) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
