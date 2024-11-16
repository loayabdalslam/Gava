import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Props {
  hashtag: string;
  posts: Array<{ content: string }>;
}

export default function AIHashtagSummary({ hashtag, posts }: Props) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const postsContent = posts
        .map((post) => post.content)
        .join('\n\n');

      const prompt = `Analyze and summarize the following posts related to ${hashtag}:\n\n${postsContent}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setSummary(response.text());
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Failed to generate summary. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">AI Summary for {hashtag}</h2>
        <button
          onClick={generateSummary}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>
      {summary && (
        <div className="prose prose-invert max-w-none">
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}