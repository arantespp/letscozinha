import { BASE_URL } from 'src/constants';

export function getUrl(href: string) {
  return new URL(href, BASE_URL).href;
}
