'use client';

import { useEffect, useState } from 'react';
import { getFeaturedPosts, type FeaturedPost } from '@/lib/supabase-client';

export default function WeeklyDigestCard() {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFeaturedPosts('approved');
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-red-800">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
        <h2 className="text-lg sm:text-xl font-bold mb-4">📰 Weekly Digest</h2>
        <p className="text-gray-500 text-sm">No digests available yet.</p>
      </div>
    );
  }

  const latestPost = posts[0];

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">📰 Weekly Digest</h2>
        <span className="text-xs text-gray-400">
          {new Date(latestPost.published_at || latestPost.generated_at).toLocaleDateString('zh-TW')}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">{latestPost.title}</h3>
        <p className="text-gray-400 text-sm">{latestPost.summary}</p>
      </div>

      {latestPost.content && (
        <div className="bg-gray-800 rounded p-3 max-h-64 overflow-y-auto">
          <div className="prose prose-invert prose-sm">
            {latestPost.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2 text-sm">
                {line.startsWith('# ') ? (
                  <span className="font-bold text-lg">{line.slice(2)}</span>
                ) : line.startsWith('- ') ? (
                  <span className="text-gray-300">• {line.slice(2)}</span>
                ) : (
                  <span className="text-gray-400">{line}</span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-gray-500">
          {posts.length} digest{posts.length > 1 ? 's' : ''} available
        </span>
        <button className="text-blue-400 hover:underline">
          View all →
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from Supabase • Updated weekly
      </div>
    </div>
  );
}
