'use client';

import React from 'react';
import { Download, FileText } from 'lucide-react';

export const ResumeApp: React.FC = () => {
  const resumeUrl = "/Resume SDE New.pdf";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume_SDE_New.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-blue-400" />
          <span className="text-xs font-medium text-zinc-300">Resume SDE New.pdf</span>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-1.5 rounded-md bg-blue-600 px-3 py-1 text-[11px] font-semibold transition-colors hover:bg-blue-500 active:scale-95"
        >
          <Download size={14} />
          <span>Download PDF</span>
        </button>
      </div>

      {/* PDF View */}
      <div className="relative flex-1 overflow-hidden bg-zinc-800">
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="h-full w-full border-none"
          title="Resume SDE New"
        />

        {/* Guard for iframes in some browsers that might try to take over */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-zinc-800" />
      </div>
    </div>
  );
};
