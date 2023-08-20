import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { openaiEnvironment } from '../../config/keys/openapi.config';
import { PromptModule } from '../prompt/prompt.module';
import { OpenAiClient } from './openai.client';
import { OpenAIService } from './openai.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [openaiEnvironment] }), PromptModule],
  providers: [OpenAIService, OpenAiClient],
  exports: [OpenAIService],
})
export class AiModule {}
