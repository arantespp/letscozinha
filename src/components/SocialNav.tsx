'use client';

import {
  EMAIL,
  FACEBOOK_USERNAME,
  INSTAGRAM_USERNAME,
  PINTEREST_USERNAME,
  TIKTOK_USERNAME,
} from 'src/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { sendGAEvent } from '@next/third-parties/google';

const socialNavs = [
  {
    icon: faInstagram,
    label: `@${INSTAGRAM_USERNAME}`,
    href: `https://www.instagram.com/${INSTAGRAM_USERNAME}`,
    'aria-label': 'Instagram',
    event: 'instagram_click',
  },
  {
    icon: faFacebook,
    label: `/${FACEBOOK_USERNAME}`,
    href: `https://www.facebook.com/${FACEBOOK_USERNAME}`,
    'aria-label': 'Facebook',
    event: 'facebook_click',
  },
  {
    icon: faTiktok,
    label: `${TIKTOK_USERNAME}`,
    href: `https://www.tiktok.com/${TIKTOK_USERNAME}`,
    'aria-label': 'TikTok',
    event: 'tiktok_click',
  },
  {
    icon: faPinterest,
    label: `/${PINTEREST_USERNAME}`,
    href: `https://www.pinterest.com/${PINTEREST_USERNAME}`,
    'aria-label': 'Pinterest',
    event: 'pinterest_click',
  },
  {
    icon: faEnvelope,
    label: `${EMAIL}`,
    href: `mailto:${EMAIL}`,
    'aria-label': 'Email',
    event: 'email_click',
  },
];

export const SocialNav = ({
  noLabel,
  className,
  linkClassName,
  iconClassName,
}: {
  noLabel?: boolean;
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}) => {
  return (
    <nav className={className}>
      {socialNavs.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={linkClassName}
          onClick={() => {
            sendGAEvent('event', link.event);
          }}
        >
          <span className={iconClassName}>
            <FontAwesomeIcon icon={link.icon} />
          </span>
          {!noLabel && <span>{link.label}</span>}
        </a>
      ))}
    </nav>
  );
};
