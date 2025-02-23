import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'SkillM8s - On-Demand Home Services & Professional Handyman Platform',
  description: 'Connect with verified local handymen and service providers for lawn mowing, painting, plumbing, heating, and more. Book trusted professionals instantly with our easy-to-use platform.',
  keywords: [
    'handyman services',
    'home services',
    'lawn mowing',
    'plumbing services',
    'painting services',
    'heating services',
    'window cleaning',
    'local handyman',
    'professional services',
    'home maintenance',
    'service providers',
    'home repair'
  ].join(', '),
  openGraph: {
    title: 'SkillM8s - Your Trusted Home Service Platform',
    description: 'Book verified local professionals for all your home service needs. Quick, reliable, and secure.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillM8s - Professional Home Services On-Demand',
    description: 'Connect with verified local professionals for all your home service needs.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
      
        {children}
        <Footer />
      </body>
    </html>
  );
}