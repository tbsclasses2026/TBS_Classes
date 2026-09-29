import { Search, Filter, FileText, Download } from 'lucide-react';

const NotesSection = () => {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notes & Study Materials</h2>
          <p className="text-gray-300 text-lg">
            Everything you need for smarter semester preparation.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-xl">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent rounded-xl text-navy placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="Search subjects, topics, or notes..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button className="bg-primary text-navy font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors">
                Search
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 px-2">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
              <Filter className="w-4 h-4" /> Filters:
            </span>
            {['Semester 1', 'Semester 2', 'B.Tech', 'Notes', 'PYQs'].map((filter) => (
              <button key={filter} className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sample featured note */}
        <div className="mt-8 bg-navy-light border border-gray-700 rounded-xl p-4 flex items-center justify-between hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 p-3 rounded-lg text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium">Engineering Physics - Complete Notes</h4>
              <p className="text-sm text-gray-400">Unit 1 to 5 • Semester 1</p>
            </div>
          </div>
          <button className="text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotesSection;
