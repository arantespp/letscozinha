'use client';

import dynamic from 'next/dynamic';

export const SearchIcon = dynamic(
  () => import('./icons').then((mod) => mod.SearchIcon),
  {
    ssr: false,
  }
);

export const SpinnerIcon = dynamic(
  () => import('./icons').then((mod) => mod.SpinnerIcon),
  {
    ssr: false,
  }
);

export const BarsIcon = dynamic(
  () => import('./icons').then((mod) => mod.BarsIcon),
  {
    ssr: false,
  }
);

export const EnvelopeIcon = dynamic(
  () => import('./icons').then((mod) => mod.EnvelopeIcon),
  {
    ssr: false,
  }
);

export const LinkIcon = dynamic(
  () => import('./icons').then((mod) => mod.LinkIcon),
  {
    ssr: false,
  }
);

export const FacebookIcon = dynamic(
  () => import('./icons').then((mod) => mod.FacebookIcon),
  {
    ssr: false,
  }
);

export const InstagramIcon = dynamic(
  () => import('./icons').then((mod) => mod.InstagramIcon),
  {
    ssr: false,
  }
);

export const PinterestIcon = dynamic(
  () => import('./icons').then((mod) => mod.PinterestIcon),
  {
    ssr: false,
  }
);

export const TiktokIcon = dynamic(
  () => import('./icons').then((mod) => mod.TiktokIcon),
  {
    ssr: false,
  }
);
