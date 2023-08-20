import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { openaiEnvironment } from '../../config/keys/openapi.config';

@Injectable()
export class OpenAiClient extends OpenAIApi {
  constructor(
    @Inject(openaiEnvironment.KEY)
    readonly openaiEnv: ConfigType<typeof openaiEnvironment>,
  ) {
    super(new Configuration({ apiKey: openaiEnv.openaiKey }));
  }
}
