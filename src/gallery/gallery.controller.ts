import { Controller, Get, Header, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service.js';
import { GalleryQueryDto } from './dto/gallery-query.dto.js';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  // The list rarely changes; let browsers and proxies reuse it for a minute.
  @Header('Cache-Control', 'public, max-age=60')
  findAll(@Query() query: GalleryQueryDto) {
    return this.galleryService.findAll(query.category, query.simulate);
  }
}
