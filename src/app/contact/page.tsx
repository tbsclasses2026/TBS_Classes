import { Mail, MessageCircle, Send, Youtube, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 pb-20">
      <div className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Have a question or need help? Reach out to our team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you have a question about our study materials, coding resources, or just want to say hi, we're here for you.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:contact@tbsclasses.com" className="flex items-start gap-4 hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                <div className="bg-primary/20 p-3 rounded-xl text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Email Us</h3>
                  <p className="text-gray-500">contact@tbsclasses.com</p>
                </div>
              </a>
              
              <a href="https://chat.whatsapp.com/JtnHgGDW4U7Ad4ko0SukOL" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                <div className="bg-green-100 p-3 rounded-xl text-green-600 shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">WhatsApp Community</h3>
                  <p className="text-gray-500">Join our active student group</p>
                </div>
              </a>
              
              <a href="https://t.me/tbsclasses2026" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-500 shrink-0">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Telegram Channel</h3>
                  <p className="text-gray-500">@tbsclasses2026</p>
                </div>
              </a>
              
              <a href="https://youtube.com/@TBSClasses" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                <div className="bg-red-100 p-3 rounded-xl text-red-600 shrink-0">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">YouTube</h3>
                  <p className="text-gray-500">@TBSClasses</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-navy mb-6">Send us a Message</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <button 
                type="button"
                className="w-full bg-primary text-navy font-bold py-4 rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
