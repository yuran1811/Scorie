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
    <div>
      {posts.map((post) => (
        <div>
          {post.title}
          {post.url}
        </div>
      ))}
    </div>
  );
};
