import Link from 'next/link';
import { BookOpen, Youtube, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl text-white">TBS Classes</span>
            </Link>
            <p className="text-gray-400 font-medium mb-4">
              Engineering Education • Coding • Notes
            </p>
            <p className="text-sm text-gray-500 max-w-xs">
              Learn smarter and code better with our comprehensive resources designed specifically for B.Tech and Engineering students.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/subjects" className="hover:text-primary transition-colors">Subjects</Link></li>
              <li><Link href="/coding" className="hover:text-primary transition-colors">Coding</Link></li>
              <li><Link href="/notes" className="hover:text-primary transition-colors">Notes</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link href="/faculty" className="hover:text-primary transition-colors">Faculty</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Community</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://youtube.com/@TBSClasses" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <div className="bg-red-600 p-2 rounded-full text-white">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <span className="text-sm">YouTube Channel</span>
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/JtnHgGDW4U7Ad4ko0SukOL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <div className="bg-green-500 p-2 rounded-full text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm">WhatsApp Group</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/tbsclasses2026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <div className="bg-blue-500 p-2 rounded-full text-white">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Telegram Channel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 TBS Classes. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
