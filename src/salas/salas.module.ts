import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateHashModule } from '../auth/hash/create_hash.module';
@Module({
  imports: [PrismaModule, CreateHashModule],
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule { }
