import { WEBSITE_NAME } from 'src/constants';

export const getPageTitle = (title: string) => {
  return `${title} | ${WEBSITE_NAME}`;
};
