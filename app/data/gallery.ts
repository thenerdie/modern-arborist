export const galleryImages = [
  "IMG_0170.jpg",
  "IMG_0174.jpg",
  "IMG_0428.jpg",
  "IMG_0868.jpg",
  "IMG_0915.jpg",
  "IMG_0921.jpg",
  "IMG_0923.jpg",
  "IMG_3436.jpg",
  "IMG_4754.jpg",
  "IMG_8501.jpg",
] as const;

export const galleryItems = galleryImages.map((name) => ({
  src: `/gallery/${name}`,
  alt: name.replace(/_/g, " "),
}));

