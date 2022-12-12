import { Controller, Post, Body, Inject, Param } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { RideUsecase } from 'src/usecases/ride.usecase';
import { RideRequestDto } from './ride-request.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BasicHttpException } from '../exceptions/basic-http.exception';
import { ErrorCode } from 'src/infrastructure/constants/error-code.constant';
import { FinishRideRequestDto } from './finish-ride-request.dto';

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
        return await this.rideUsecases.request(body.riderId, body.lat, body.lng);
    }

    @Post(':rideId/finish')
    async finishRide(@Body() body: FinishRideRequestDto, @Param('rideId') rideId: number) {
        const data = plainToInstance(FinishRideRequestDto, body);
        const errors = await validate(data, { skipMissingProperties: false, skipNullProperties: false, skipUndefinedProperties: false });
        if (errors.length > 0) {
            throw new BasicHttpException(ErrorCode.BAD_PARAMETERS, errors);
        }
        return await this.rideUsecases.finish(rideId, body.lat, body.lng);
    }
}
