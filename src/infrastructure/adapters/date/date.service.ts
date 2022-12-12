import { Injectable } from '@nestjs/common';
import { differenceInMinutes } from 'date-fns';
import { DateAdapter } from 'src/domain/adapters/date.adapter';

@Injectable()
export class DateService implements DateAdapter {
    getDifferenceInMinutes(startDate: Date, endDate: Date): number {
        return differenceInMinutes(endDate, startDate);
    }
    
}
