export abstract class DateAdapter {
    abstract getDifferenceInMinutes(startDate: Date, endDate: Date): number;
}