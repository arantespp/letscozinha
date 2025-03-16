export type CMSData<Attributes> = {
  documentId: string;
} & Attributes;

export type ImageAttributes = {
  url: string;
  width: number;
  height: number;
  alt?: string;
  mime: string;
};

type Image = ImageAttributes & {
  formats: {
    thumbnail?: ImageAttributes;
    small?: ImageAttributes;
    medium?: ImageAttributes;
    large?: ImageAttributes;
  };
};

export type CMSImage = CMSData<Image>;

export type CMSImages = CMSImage[];

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
