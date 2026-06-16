import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StoryService } from './story.service';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get('timeline')
  getTimeline() {
    return this.storyService.getTimeline();
  }

  @Get('meta')
  getMeta() {
    return this.storyService.getMeta();
  }

  @Get('highlights')
  getHighlights() {
    return this.storyService.getHighlights();
  }

  @Get('event/:id')
  getEvent(@Param('id', ParseIntPipe) id: number) {
    return this.storyService.getEventById(id);
  }
}
