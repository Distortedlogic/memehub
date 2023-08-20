import { ApiProperty } from '@nestjs/swagger';
import { AdditionalDetailsDTO } from './AuthorDTO';

export class FeedDTO {
  @ApiProperty({ example: 'NASA Breaking News' })
  title: string;

  @ApiProperty({ example: 'A RSS news feed containing the latest NASA news articles and press releases.' })
  description: string;

  @ApiProperty({ example: 'http://www.nasa.gov/' })
  homepage: string;

  @ApiProperty({ example: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' })
  feed_url: string;

  @ApiProperty()
  additional_details: AdditionalDetailsDTO;
}
