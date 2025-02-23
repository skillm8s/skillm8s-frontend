import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SkillM8s</h3>
              <p className="text-gray-400">
                Your trusted platform for professional home services.
              </p>
            </div>
            {/* <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Lawn Mowing</li>
                <li>Painting</li>
                <li>Window Cleaning</li>
                <li>Plumbing</li>
                <li>Heating</li>
              </ul>
            </div> */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <Link href="#how-it-works">
                <li>How It Works</li>
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <Link  href="mailto:partnerships.skillm8s@gmail.com" >
                <li>partnerships[dot]skillm8s[at]gmail[dot]com</li>
                </Link>
                {/* <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>LinkedIn</li> */}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SkillM8s. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }