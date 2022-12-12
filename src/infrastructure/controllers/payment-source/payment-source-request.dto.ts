import { PaymentSourceDto } from "src/domain/dto/payment-source.dto";
import { IsString, Matches, IsNumber, IsNotEmpty } from 'class-validator';

export class PaymentSourceRequestDto implements Partial<PaymentSourceDto> {
    @IsString()
    @Matches(/NEQUI|CARD/)
    type: "NEQUI" | "CARD";

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    acceptance_token: string;

    @IsNumber()
    userId: number;
};