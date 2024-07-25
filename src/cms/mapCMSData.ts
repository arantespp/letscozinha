import type { CMSData } from './types';

export const mapCMSData = <Attributes>(data: CMSData<Attributes>) => {
  return {
    id: data.id,
    ...data.attributes,
  };
};
