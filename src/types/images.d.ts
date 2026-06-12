type StaticImageData = import('next/dist/shared/lib/get-img-props').StaticImageData;

declare module '*.png' {
  const src: StaticImageData;
  export default src;
}

declare module '*.webp' {
  const src: StaticImageData;
  export default src;
}
