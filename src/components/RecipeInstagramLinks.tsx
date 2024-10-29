'use client';

import * as React from 'react';
import { InstagramIcon } from 'src/icons/lazyIcons';
import { sendGAEvent } from '@next/third-parties/google';

export function RecipeInstagramLinks({
  instagram_posts = [],
  slug,
}: {
  instagram_posts?: { url: string }[];
  slug: string;
}) {
  if (!instagram_posts.length) {
    return null;
  }

  const nodes = instagram_posts.map((post, index) => {
    const hasComma =
      instagram_posts.length > 1 && index < instagram_posts.length - 1;

    if (index === 0) {
      return (
        <span key={post.url}>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              sendGAEvent('event', 'instagram_click', { value: slug });
            }}
            className="no-underline"
          >
            <span className="text-[1.5em] mr-xs align-[-3px]">
              <InstagramIcon />
            </span>{' '}
            Confira a receita no Instagram
            {hasComma ? ',' : ''}
          </a>
        </span>
      );
    }

    return (
      <a
        key={post.url}
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        post {index + 1}
        {hasComma ? ',' : ''}
      </a>
    );
  });

  // add space between nodes
  for (let i = 1; i < nodes.length; i += 2) {
    nodes.splice(i, 0, <span> </span>);
  }

  return <span>{nodes}</span>;
}
