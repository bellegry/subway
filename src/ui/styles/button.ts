import { cva } from 'class-variance-authority';

export const button = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'border',
    'text-sm',
    'font-medium',
  ],
  {
    variants: {
      variant: {
        default: 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100',
        primary: 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);
