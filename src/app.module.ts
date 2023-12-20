import { Module } from '@nestjs/common';

import { IdentificationModule } from './identification/identification.module';

@Module({
  imports: [IdentificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
