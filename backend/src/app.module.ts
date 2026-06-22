import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // disponível em toda a aplicação
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
