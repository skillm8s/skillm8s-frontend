import Hero from '@/app/components/home/Hero';
import Services from '@/app/components/home/Services';
import HowItWorks from '@/app/components/home/HowItWorks';
import WaitlistForm from '@/app/components/home/WaitlistForm';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head>
                <link rel="icon" href="/logo.svg" />
            </Head>
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <WaitlistForm />
    </main>
    </>
  );
} 