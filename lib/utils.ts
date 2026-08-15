import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — دمج أصناف Tailwind بأمان مع حل أي تعارض بينها
 * تُستخدم في كل مكونات ui/*
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
