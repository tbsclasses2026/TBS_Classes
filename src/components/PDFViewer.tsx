"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>();

  return (
    <Document
      file={fileUrl}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      loading={<div className="p-20 text-gray-500">Loading PDF...</div>}
      error={<div className="p-20 text-red-500">Failed to load PDF. Please download it instead.</div>}
    >
      {Array.from(new Array(numPages || 0), (el, index) => (
        <Page 
          key={`page_${index + 1}`} 
          pageNumber={index + 1} 
          className="mb-4 shadow-md"
          width={800}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
}
