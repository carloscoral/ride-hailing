import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { RideUsecase } from 'src/usecases/ride.usecase';
import { RideRequestDto } from './ride-request.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BasicHttpException } from '../exceptions/basic-http.exception';
import { ErrorCode } from 'src/infrastructure/constants/error-code.constant';

@Controller('ride')
export class RideController {

    constructor(
        @Inject(UsecasesProxyModule.RIDE_USECASES)
        private rideUsecases: RideUsecase
    ) { }

    @Post()
    async createRide(@Body() body: RideRequestDto) {
        const data = plainToInstance(RideRequestDto, body);
        const errors = await validate(data, { skipMissingProperties: false, skipNullProperties: false, skipUndefinedProperties: false });
        if (errors.length > 0) {
            throw new BasicHttpException(ErrorCode.BAD_PARAMETERS, errors);
        }
        const result = await this.rideUsecases.request(body.riderId, body.lat, body.lng);
        return result;
    }
}
