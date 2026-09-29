'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  defaultLanguage?: string;
  onCodeChange?: (code: string) => void;
  storageKey?: string;
}

const LANGUAGES = [
  { id: 'c', name: 'C', defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}' },
  { id: 'cpp', name: 'C++', defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}' },
  { id: 'java', name: 'Java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { id: 'python', name: 'Python', defaultCode: 'print("Hello, World!")' },
  { id: 'javascript', name: 'JavaScript', defaultCode: 'console.log("Hello, World!");' },
];

const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: '18.15.0',
  python: '3.10.0',
  java: '15.0.2',
  c: '10.2.0',
  cpp: '10.2.0',
};

export default function CodeEditor({ initialCode, defaultLanguage = 'c', onCodeChange, storageKey }: CodeEditorProps) {
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState<string>('');
  const [stdin, setStdin] = useState<string>('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let savedCode = '';
    if (storageKey) {
      savedCode = localStorage.getItem(`draft_${storageKey}_${language}`) || '';
    }
    
    if (savedCode) {
      setCode(savedCode);
    } else if (initialCode) {
      setCode(initialCode);
    } else {
      const langData = LANGUAGES.find(l => l.id === language);
      setCode(langData?.defaultCode || '');
    }
  }, [language, initialCode, storageKey]);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setOutput('');
  };

  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode || '';
    setCode(val);
    if (onCodeChange) onCodeChange(val);
    if (storageKey) {
      localStorage.setItem(`draft_${storageKey}_${language}`, val);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your code to the default boilerplate?')) {
      if (storageKey) localStorage.removeItem(`draft_${storageKey}_${language}`);
      const langData = LANGUAGES.find(l => l.id === language);
      setCode(langData?.defaultCode || '');
      setOutput('');
    }
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput('Executing...');
    try {
      // Fetch available compilers to dynamically find the correct stable version
      const listRes = await fetch('https://wandbox.org/api/list.json');
      const compilers = await listRes.json();
      
      let compilerName = '';
      if (language === 'c') {
        const cCompilers = compilers.filter((c: any) => c.language === 'C' && c.name.includes('gcc'));
        compilerName = cCompilers[0]?.name || 'gcc-head-c';
      } else if (language === 'cpp') {
        const cppCompilers = compilers.filter((c: any) => c.language === 'C++' && c.name.includes('gcc'));
        compilerName = cppCompilers[0]?.name || 'gcc-head';
      } else if (language === 'java') {
        const javaCompilers = compilers.filter((c: any) => c.language === 'Java');
        compilerName = javaCompilers[0]?.name || 'openjdk-head';
      } else if (language === 'python') {
        // Filter out 'head' to avoid unstable docker container errors (e.g. catatonit pid1 error)
        const pyCompilers = compilers.filter((c: any) => c.language === 'Python' && c.name.includes('cpython') && !c.name.includes('head'));
        compilerName = pyCompilers[0]?.name || 'cpython-3.11.0';
      } else if (language === 'javascript') {
        const jsCompilers = compilers.filter((c: any) => c.language === 'JavaScript' && c.name.includes('nodejs') && !c.name.includes('head'));
        compilerName = jsCompilers[0]?.name || 'nodejs-head';
      }

      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: compilerName,
          code: code,
          stdin: stdin || ''
        })
      });
      
      const data = await response.json();
      
      if (data.status !== '0' && data.compiler_error) {
        setOutput(`Compiler Error:\n${data.compiler_error}`);
      } else if (data.program_error) {
        setOutput(`Runtime Error:\n${data.program_error}\n\nOutput:\n${data.program_message || ''}`);
      } else if (data.program_message || data.program_output) {
        setOutput(data.program_message || data.program_output);
      } else {
        setOutput(`Execution finished (no output).\nRaw Data: ${JSON.stringify(data)}`);
      }
    } catch (err: any) {
      setOutput(`System Error: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <select 
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-slate-700 text-white text-sm rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/50"
          >
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          
          <button 
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-700 transition-colors"
            title="Reset to default code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={executeCode}
          disabled={isExecuting}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
        >
          {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          Run Code
        </button>
      </div>

      {/* Editor Space */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            padding: { top: 16 }
          }}
        />
      </div>

      {/* Output & Input Panel */}
      <div className="h-48 flex border-t border-slate-700 bg-black">
        {/* Custom Input */}
        <div className="w-1/3 border-r border-slate-700 flex flex-col">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider p-2 border-b border-slate-700 bg-slate-900">
            Custom Input
          </div>
          <textarea
            className="flex-1 bg-transparent text-slate-300 font-mono text-sm p-3 resize-none outline-none focus:ring-1 focus:ring-primary/50 inset-0"
            placeholder="Enter standard input here..."
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
          />
        </div>
        
        {/* Output */}
        <div className="w-2/3 flex flex-col">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider p-2 border-b border-slate-700 bg-slate-900">
            Output
          </div>
          <div className="flex-1 text-green-400 font-mono text-sm p-4 overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-slate-600">Console output will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
