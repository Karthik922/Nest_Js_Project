import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setTimeout as sleep } from 'node:timers/promises';
import { GALLERY_IMAGES } from './gallery.data.js';
import { GALLERY_CATEGORIES, GalleryCategory, GalleryImage, GalleryResponse } from './gallery.model.js';
import { Simulation } from './dto/gallery-query.dto.js';

/** An id the CDN rejects (HTTP 400), used to exercise the frontend's broken-image fallback. */
const BROKEN_IMAGE_ID = 'notARealImage1L';

@Injectable()
export class GalleryService {
  private readonly simulationsEnabled: boolean;

  constructor(config: ConfigService) {
    this.simulationsEnabled = config.get<string>('NODE_ENV') !== 'production';
  }

  async findAll(category?: GalleryCategory, simulate?: Simulation): Promise<GalleryResponse> {
    const mode = this.simulationsEnabled ? simulate : undefined;
    if (mode === 'slow') await sleep(6_000);
    if (mode === 'timeout') await sleep(30_000);
    if (mode === 'error') throw new ServiceUnavailableException('Gallery service is temporarily unavailable');

    let data: GalleryImage[] = category ? GALLERY_IMAGES.filter((img) => img.category === category) : GALLERY_IMAGES;
    if (mode === 'broken-image') {
      // Break every third image so several cards show the fallback.
      data = data.map((img, i) => (i % 3 === 1 ? { ...img, imageId: BROKEN_IMAGE_ID } : img));
    }

    return {
      data,
      meta: {
        total: data.length,
        categories: GALLERY_CATEGORIES.map((name) => ({
          name,
          count: GALLERY_IMAGES.filter((img) => img.category === name).length,
        })),
      },
    };
  }
}
