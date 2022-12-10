import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSourceWService } from './payment-source-w.service';

describe('PaymentSourceWService', () => {
  let service: PaymentSourceWService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSourceWService],
    }).compile();

    service = module.get<PaymentSourceWService>(PaymentSourceWService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
