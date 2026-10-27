export const GALLERY_CATEGORIES = ['Headphones', 'Smart watches', 'Running shoes', 'Cameras'] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryImage {
  id: number;
  title: string;
  category: GalleryCategory;
  /** Price in INR. */
  price: number;
  /** Amazon CDN file id, e.g. `711l4y8aNlL`. */
  imageId: string;
  alt: string;
}

export interface GalleryResponse {
  data: GalleryImage[];
  meta: {
    total: number;
    /** Every category with its item count, independent of the current filter (for the filter chips). */
    categories: { name: GalleryCategory; count: number }[];
  };
}
