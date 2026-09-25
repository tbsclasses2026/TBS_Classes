import NotesSection from '@/components/NotesSection';

export default function NotesPage() {
  return (
    <div className="bg-white pb-20">
      <div className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Notes & Study Materials</h1>
          <p className="text-xl text-gray-300">
            Search, filter, and download the best study materials for your semester exams.
          </p>
        </div>
      </div>
      
      {/* We reuse the NotesSection component here */}
      <div className="-mt-20">
        <NotesSection />
      </div>
    </div>
  );
}
