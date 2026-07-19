import { routing } from '@/i18n/routing';
import { AboutPage } from '@/views/about-page';
import { setRequestLocale } from 'next-intl/server';

interface AboutProps {
  params: Promise<{
    locale: string;
  }>;
}

function generateStaticParameters() {
  return routing.locales.map((locale) => ({ locale }));
}

export { generateStaticParameters as generateStaticParams };

export default async function About({ params }: AboutProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <AboutPage />;
}
