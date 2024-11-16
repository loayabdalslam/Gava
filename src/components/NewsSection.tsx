import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator?: string;
}

const TECH_RSS_FEEDS = [
  'https://dev.to/feed',
  'https://www.freecodecamp.org/news/rss/',
  'https://css-tricks.com/feed/',
];

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const parser = new Parser();
        const allNews: NewsItem[] = [];

        for (const feed of TECH_RSS_FEEDS) {
          try {
            const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(feed)}`);
            const feedData = await response.text();
            const feed = await parser.parseString(feedData);
            allNews.push(...(feed.items as NewsItem[]));
          } catch (error) {
            console.error(`Error fetching ${feed}:`, error);
          }
        }

        setNews(
          allNews
            .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
            .slice(0, 10)
        );
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading news...</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Tech News</h2>
      <div className="space-y-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-700 p-3 rounded-lg transition-colors"
          >
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-400 mt-1">
              By {item.creator || 'Unknown'} • {new Date(item.pubDate).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}