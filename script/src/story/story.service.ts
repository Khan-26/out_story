import { Injectable, NotFoundException } from '@nestjs/common';
import { TIMELINE_EVENTS, STORY_META, TimelineEvent } from './timeline.data';

@Injectable()
export class StoryService {
  getTimeline(): TimelineEvent[] {
    return TIMELINE_EVENTS;
  }

  getMeta() {
    return STORY_META;
  }

  getEventById(id: number): TimelineEvent {
    const event = TIMELINE_EVENTS.find((e) => e.id === id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  getHighlights(): TimelineEvent[] {
    return TIMELINE_EVENTS.filter((e) => e.highlight);
  }
}
