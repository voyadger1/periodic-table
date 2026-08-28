import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const env = (envName: string): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  return import.meta.env[envName];
};
