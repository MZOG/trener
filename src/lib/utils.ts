import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber: string) {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return cleaned?.match(/.{1,3}/g).join(' ');
}

export function slugify(str: string) {
  const fromChar = [
    /ą/gi,
    /ę/gi,
    /ó/gi,
    /ś/gi,
    /ł/gi,
    /ż/gi,
    /ź/gi,
    /ć/gi,
    /ń/gi
  ];
  const toChar = ['a', 'e', 'o', 's', 'l', 'z', 'z', 'c', 'n'];
  for (const i in fromChar) str = str.replace(fromChar[i], toChar[i]);
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '');
  return str;
}
