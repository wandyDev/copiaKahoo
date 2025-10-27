import { Module } from '@nestjs/common';
import { GameGatewayService } from './game-gateway.service';
import { GameGatewayGateway } from './game-gateway.gateway';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [GameGatewayGateway, GameGatewayService],
})
export class GameGatewayModule { }
