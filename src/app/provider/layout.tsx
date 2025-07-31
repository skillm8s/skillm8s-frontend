import Link from 'next/link';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/provider/dashboard" className="text-xl font-semibold text-gray-900">
                Provider Dashboard
              </Link>
              <Link 
                href="/provider/services" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                My Services
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/provider/services/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Service
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}