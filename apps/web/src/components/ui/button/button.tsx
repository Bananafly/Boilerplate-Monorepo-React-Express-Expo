/* eslint-disable tailwindcss/no-custom-classname */
/** @format */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-main-blue hover:bg-main-blue-500/90 text-white shadow',
        destructive:
          'bg-main-red-400 text-main-red-900 hover:bg-main-red-500/90 shadow',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        // todo
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        // todo
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // todo
        link: 'text-primary underline-offset-4 hover:underline',
        // todo
        ghostAdd:
          'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        // todo nop petrol in new colors
        primary_petrol:
          'bg-main-blue-800 hover:bg-main-blue-800/80 text-white shadow',

        primary_blue: 'bg-main-blue hover:bg-main-blue text-white shadow',
        primary_orange:
          'bg-main-orange hover:bg-main-orange/80 text-white shadow',

        accent_red: 'hover:bg-accent-salmon bg-transparent text-white shadow',
        accent_pink: 'hover:bg-accent-pink bg-transparent text-white shadow',
        accent_purple:
          'hover:bg-accent-violet bg-transparent text-white shadow',
        accent_blue:
          'hover:bg-accent-babyblue bg-transparent text-white shadow',
        ghost_dark_hover: 'hover:bg-slate-300',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
