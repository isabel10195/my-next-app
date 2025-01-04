import React from "react";
import { Button as NextUIButton } from "@nextui-org/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("rounded-md", {
  variants: {
    variant: {
      default: "bg-primary text-white hover:bg-primary/90",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      ghost: "bg-transparent hover:bg-gray-100",
      link: "text-blue-500 underline hover:no-underline",
    },
    size: {
      default: "h-8 px-3 py-1.5 text-sm", // Texto un poco más pequeño
      sm: "h-7 px-3 py-1 text-xs", // Tamaño pequeño con texto más pequeño
      lg: "h-9 px-4 py-2 text-base", // Tamaño más grande con texto estándar
      icon: "h-8 w-8 text-sm", // Ícono reducido con texto pequeño
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : NextUIButton;

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {props.children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
