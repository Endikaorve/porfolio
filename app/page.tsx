import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

// Redirige la ruta raíz al locale por defecto
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
