import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export default function (...inputs: ClassValue[]) {
  // return (clsx(inputs))
  return twMerge(clsx(inputs))
}
