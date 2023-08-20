import { ApiProperty } from '@nestjs/swagger';
import { AdditionalDetailsDTO } from './AuthorDTO';
import { FeedDTO } from './FeedDTO';

class ImageDTO {
  @ApiProperty({ example: 'https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/iss066e077280_0.jpg' })
  url: string;

  @ApiProperty({ example: 985 })
  width: number;

  @ApiProperty({ example: 657 })
  height: number;
}

class ContentDTO {
  @ApiProperty({ example: 'Example content' })
  text: string;

  @ApiProperty({ example: '<p>Example content</p>' })
  html: string;
}

class NewEntryDTO {
  @ApiProperty({ example: 'NASA Astronauts to Call Indiana, Texas, Virginia Students from Space' })
  title: string;

  @ApiProperty({ example: 'http://www.nasa.gov/press-release/nasa-astronauts-to-call-indiana-texas-virginia-students-from-space' })
  link: string;

  @ApiProperty({
    example:
      'Students across the country will have three opportunities to hear from NASA astronauts aboard the International Space Station.',
  })
  description: string;

  @ApiProperty()
  content: ContentDTO;

  @ApiProperty({ example: 'http://www.nasa.gov/press-release/nasa-astronauts-to-call-indiana-texas-virginia-students-from-space' })
  guid: string;

  @ApiProperty()
  image: ImageDTO;

  @ApiProperty()
  additional_details: AdditionalDetailsDTO;

  @ApiProperty({ example: 'Fri, 04 Feb 2022 20:13:00 +0000' })
  time: string;

  @ApiProperty({ example: 1644005580 })
  timestamp: number;
}

export class WebhookDataDTO {
  @ApiProperty({ example: 'rssapi.net' })
  webhook_from: string;

  @ApiProperty({ example: 'new entries in feed' })
  webhook_reason: string;

  @ApiProperty({ example: 2 })
  new_entries_count: number;

  @ApiProperty({ example: 22798 })
  subscription_id: number;

  @ApiProperty({ example: 200 })
  last_webhook_response: number;

  @ApiProperty({ example: false })
  is_retry: boolean;

  @ApiProperty({ example: 'Your subscription info' })
  info: string;

  @ApiProperty()
  feed: FeedDTO;

  @ApiProperty({ type: [NewEntryDTO] })
  new_entries: NewEntryDTO[];
}
