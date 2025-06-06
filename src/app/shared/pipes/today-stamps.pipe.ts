import { Pipe, PipeTransform } from '@angular/core';
import { IEnrichedStamp } from '../models/enrichedStamp.interface';

@Pipe({
  name: 'todayStamps'
})
export class TodayStampsPipe implements PipeTransform {

  transform(stamps: IEnrichedStamp[]): IEnrichedStamp[] {
    const today = new Date();
    return stamps.filter(stamp => {
      const stampDate = new Date(stamp.date);
      return (
        stampDate.getDate() === today.getDate() &&
        stampDate.getMonth() === today.getMonth() &&
        stampDate.getFullYear() === today.getFullYear()
      );
    });
  }
}
