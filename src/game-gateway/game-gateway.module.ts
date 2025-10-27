import { Module } from '@nestjs/common';
import { GameGatewayService } from './game-gateway.service';
import { GameGatewayGateway } from './game-gateway.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateHashModule } from '../auth/hash/create_hash.module';
@Module({
  imports: [PrismaModule, CreateHashModule],
  providers: [GameGatewayGateway, GameGatewayService],
})
export class GameGatewayModule { }
