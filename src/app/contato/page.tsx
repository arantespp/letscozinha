import {
  FACEBOOK_USERNAME,
  INSTAGRAM_USERNAME,
  EMAIL,
  TIKTOK_USERNAME,
} from 'src/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const links = [
  {
    icon: faInstagram,
    text: `@${INSTAGRAM_USERNAME}`,
    url: `https://www.instagram.com/${INSTAGRAM_USERNAME}`,
  },
  {
    icon: faFacebook,
    text: `/${FACEBOOK_USERNAME}`,
    url: `https://www.facebook.com/${FACEBOOK_USERNAME}`,
  },
  {
    icon: faTiktok,
    text: `${TIKTOK_USERNAME}`,
    url: `https://www.tiktok.com/${TIKTOK_USERNAME}`,
  },
  {
    icon: faEnvelope,
    text: `${EMAIL}`,
    url: `mailto:${EMAIL}`,
  },
];

export default async function Contact() {
  return (
    <div className="container">
      <h1>Contato</h1>
      <p>
        Se você tiver alguma dúvida, sugestão ou quiser falar conosco, entre em
        contato pelos nossos canais de comunicação.
      </p>
      <div className="flex flex-col gap-md mt-lg">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.text}
            className="flex items-center gap-md no-underline"
          >
            <span className="text-3xl">
              <FontAwesomeIcon icon={link.icon} />
            </span>
            <span className="text-lg">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
