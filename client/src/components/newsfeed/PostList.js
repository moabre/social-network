import React from 'react';
import Post from './Post';

export default function PostList({ posts }) {
  return (
    <div style={{ marginTop: '24px' }}>
      {posts.map((item, i) => {
        return <Post post={item} key={i} />;
      })}
    </div>
  );
}
