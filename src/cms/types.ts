export type CMSResponse<Attributes = Record<string, unknown>> = {
  data: {
    id: number;
    attributes: Attributes;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
