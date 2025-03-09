import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  faBars,
  faEnvelope,
  faLink,
  faSearch,
  faSpinner,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

export type Props = Omit<FontAwesomeIconProps, 'icon'>;

export const BarsIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faBars} />
);

export const EnvelopeIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faEnvelope} />
);

export const LinkIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faLink} />
);

export const CopyIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faCopy} />
);

export const SearchIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faSearch} />
);

export const SpinnerIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faSpinner} />
);

export const FacebookIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faFacebook} />
);

export const InstagramIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faInstagram} />
);

export const PinterestIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faPinterest} />
);

export const TiktokIcon = (props: Props) => (
  <FontAwesomeIcon {...props} icon={faTiktok} />
);
