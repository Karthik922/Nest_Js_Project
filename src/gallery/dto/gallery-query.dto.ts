import { IsIn, IsOptional } from 'class-validator';
import { GALLERY_CATEGORIES, type GalleryCategory } from '../gallery.model.js';

/** Development-only failure modes for testing the frontend's loading and error states. */
export const SIMULATIONS = ['slow', 'timeout', 'error', 'broken-image'] as const;
export type Simulation = (typeof SIMULATIONS)[number];

export class GalleryQueryDto {
  @IsOptional()
  @IsIn(GALLERY_CATEGORIES)
  category?: GalleryCategory;

  /** Ignored when NODE_ENV=production. */
  @IsOptional()
  @IsIn(SIMULATIONS)
  simulate?: Simulation;
}
