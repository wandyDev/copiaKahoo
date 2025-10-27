import { Test, TestingModule } from '@nestjs/testing';
import { GameGatewayGateway } from './game-gateway.gateway';
import { GameGatewayService } from './game-gateway.service';

describe('GameGatewayGateway', () => {
  let gateway: GameGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGatewayGateway, GameGatewayService],
    }).compile();

    gateway = module.get<GameGatewayGateway>(GameGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
