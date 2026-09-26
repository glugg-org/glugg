// valkey.module.ts
import { Global, Module } from '@nestjs/common';
import { redisProvider, redisSubProvider } from './valkey.provider';
import { VALKEY_CLIENT, VALKEY_SUB_CLIENT } from './valkey.constants';

@Global()
@Module({
  providers: [redisProvider, redisSubProvider],
  exports: [VALKEY_CLIENT, VALKEY_SUB_CLIENT],
})
export class ValkeyModule {}
