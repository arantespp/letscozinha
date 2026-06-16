import {
  EMAIL,
  FACEBOOK_USERNAME,
  INSTAGRAM_USERNAME,
  PINTEREST_USERNAME,
  TIKTOK_USERNAME,
} from 'src/constants';
import {
  EnvelopeIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TiktokIcon,
} from 'src/icons/icons';

const socialNavs = [
  {
    icon: <InstagramIcon />,
    label: `@${INSTAGRAM_USERNAME}`,
    href: `https://www.instagram.com/${INSTAGRAM_USERNAME}`,
    'aria-label': 'Instagram',
  },
  {
    icon: <FacebookIcon />,
    label: `/${FACEBOOK_USERNAME}`,
    href: `https://www.facebook.com/${FACEBOOK_USERNAME}`,
    'aria-label': 'Facebook',
  },
  {
    icon: <TiktokIcon />,
    label: `${TIKTOK_USERNAME}`,
    href: `https://www.tiktok.com/${TIKTOK_USERNAME}`,
    'aria-label': 'TikTok',
  },
  {
    icon: <PinterestIcon />,
    label: `/${PINTEREST_USERNAME}`,
    href: `https://www.pinterest.com/${PINTEREST_USERNAME}`,
    'aria-label': 'Pinterest',
  },
  {
    icon: <EnvelopeIcon />,
    label: `${EMAIL}`,
    href: `mailto:${EMAIL}`,
    'aria-label': 'Email',
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
        >
          <span className={iconClassName}>{link.icon}</span>
          {!noLabel && <span>{link.label}</span>}
        </a>
      ))}
    </nav>
  );
};
