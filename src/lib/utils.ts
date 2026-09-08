// أدوات مشتركة لبناء className بشكل آمن مع دمج قواعد Tailwind المتعارضة.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// clsx يحول القيم إلى نص، وtwMerge يحتفظ بآخر قاعدة Tailwind عند التعارض.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
