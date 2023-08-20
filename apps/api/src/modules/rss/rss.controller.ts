import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateRssFeedParams } from './params/ValidateRssFeedParams';
import { ValidateRssFeedDTO } from './rest/ValidateRssFeedDTO';
import { WebhookDataDTO } from './rest/WebhookDataDTO';
import { RssApi } from './rss.api';

@Controller('rss')
@ApiTags('rss')
export class RssController {
  constructor(private readonly api: RssApi) {}

  @Post('webhook')
  @ApiOperation({ summary: 'Handle webhook data' })
  @ApiBody({ type: () => WebhookDataDTO })
  @ApiResponse({ status: 200, description: 'Webhook data handled successfully' })
  webhook(@Body() webhookData: any) {
    this.api;
    console.log(webhookData);
  }

  @Get('validate')
  @ApiOperation({ summary: 'Validates a url is a feed' })
  @ApiQuery({ type: ValidateRssFeedParams })
  @ApiOkResponse({ type: ValidateRssFeedDTO })
  @ApiResponse({ status: 200 })
  validate(@Query() { url }: ValidateRssFeedParams): Promise<ValidateRssFeedDTO> {
    return this.api.validateFeed(url);
  }
}
