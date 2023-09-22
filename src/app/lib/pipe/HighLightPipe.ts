import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: any, search: string): string {
    if (!text || search.toLocaleString().indexOf('object Object') !== -1) {
      return '';
    }

    if (
      text !== null &&
      text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    ) {
      return text.replace(search, '<b>' + search + '</b>');
    }
    return text;
  }
}
