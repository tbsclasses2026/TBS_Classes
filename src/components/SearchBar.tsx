'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, ArrowRight, BookOpen, Code, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ subjects: any[], notes: any[], coding: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults(null);
        setIsOpen(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Helper to highlight matching text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? 
            <span key={i} className="bg-yellow-200 text-navy font-semibold">{part}</span> : part
        )}
      </span>
    );
  };

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  const hasResults = results && (results.subjects.length > 0 || results.notes.length > 0 || results.coding.length > 0);

  return (
    <div className="relative w-full max-w-md hidden md:block" ref={wrapperRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white sm:text-sm transition-colors"
          placeholder="Search subjects, notes, coding topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim() && results) setIsOpen(true);
          }}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Loader2 className="h-4 w-4 text-primary animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
          {!hasResults && !isLoading ? (
            <div className="p-4 text-sm text-gray-500 text-center">No results found for "{query}"</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              
              {/* Subjects Group */}
              {results?.subjects && results.subjects.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Subjects
                  </div>
                  {results.subjects.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleResultClick('/subjects')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-navy cursor-pointer transition-colors"
                    >
                      {highlightText(item.title, query)}
                    </button>
                  ))}
                </div>
              )}

              {/* Notes Group */}
              {results?.notes && results.notes.length > 0 && (
                <div className="py-2 border-t border-gray-50">
                  <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Notes
                  </div>
                  {results.notes.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleResultClick('/notes')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-navy cursor-pointer transition-colors"
                    >
                      <div>{highlightText(item.title, query)}</div>
                      {item.subject && <div className="text-xs text-gray-500 mt-0.5">{item.subject}</div>}
                    </button>
                  ))}
                </div>
              )}

              {/* Coding Group */}
              {results?.coding && results.coding.length > 0 && (
                <div className="py-2 border-t border-gray-50">
                  <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Code className="w-3 h-3" /> Coding Practice
                  </div>
                  {results.coding.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleResultClick(`/practice/${item._id}`)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-navy cursor-pointer transition-colors"
                    >
                      {highlightText(item.title, query)}
                    </button>
                  ))}
                </div>
              )}

              {/* See All link */}
              {hasResults && (
                <div className="border-t border-gray-100 p-2 bg-gray-50">
                  <button 
                    onClick={() => handleResultClick(`/search?q=${encodeURIComponent(query)}`)}
                    className="w-full text-center px-4 py-2 text-sm text-primary font-medium hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center gap-1"
                  >
                    See all results for "{query}" <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
