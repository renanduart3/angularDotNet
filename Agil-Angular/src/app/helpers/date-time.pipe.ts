import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../utils/Constants';

@Pipe({
  name: 'dateTimePipe'
})
export class DateTimePipe extends DatePipe  implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }

}
