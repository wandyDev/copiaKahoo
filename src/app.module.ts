import { Module } from '@nestjs/common';
import { SalasModule } from './salas/salas.module';
import { GameGatewayModule } from './game-gateway/game-gateway.module';
@Module({
  imports: [SalasModule, GameGatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
