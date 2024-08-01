export type CMSData<Attributes> = {
  id: number;
  attributes: Attributes;
};

type ImageAttributes = {
  url: string;
  width: number;
  height: number;
};

type Image = ImageAttributes & {
  formats: {
    thumbnail: ImageAttributes;
    small: ImageAttributes;
    medium: ImageAttributes;
    large: ImageAttributes;
  };
};

export type CMSImages = {
  data: CMSData<Image>[];
};

export type CMSImage = {
  data: CMSData<Image>;
};

export type CMSMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type CMSDataArrayResponse<Attributes = Record<string, unknown>> = {
  data: CMSData<Attributes>[];
  meta: CMSMeta;
};

export type CMSSingleDataResponse<Attributes = Record<string, unknown>> = {
  data: CMSData<Attributes>;
  meta: {};
};
