import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden my-4">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span className="text-sm text-gray-400">{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: '#1a1a1a',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}