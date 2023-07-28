import { PostType, useRecentPosts } from '@/hooks';
import { useEffect, useState } from 'react';

export const PostPreview = () => {
  const { data, error, loading } = useRecentPosts();

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    if (error || !data || loading) return;

    console.log('posts: ', posts);
    setPosts(posts);
  }, [data, error, loading]);

  return (
    <div className="grid grid-flow-row-dense grid-cols-1 medmb:grid-cols-2">
      {posts.map((post) => (
        <div className="flexcentercol gap-4">
          <p className="font-bold">{post.title}</p>
          <p>{post.url}</p>
        </div>
      ))}
    </div>
  );
};
