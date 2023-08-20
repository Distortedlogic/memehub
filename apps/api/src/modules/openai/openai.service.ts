import { Injectable } from '@nestjs/common';
import { CreateChatCompletionRequest } from 'openai';
import { OpenAiClient } from './openai.client';

@Injectable()
export class OpenAIService {
  constructor(private readonly openAIClient: OpenAiClient) {}

  async runChatgpt(args: CreateChatCompletionRequest) {
    const completion = await this.openAIClient.createChatCompletion(args);
    return completion.data.choices[0].message?.content ?? '';
  }
}
