import {Pipe, PipeTransform} from 'angular2/core';
@Pipe({
    name: 'getPropertyPipe'
})
export class GetPropertyPipe implements PipeTransform {
    transform(obj: any, args: Array<string>) {
        if(obj) {
            return obj[args[0]][args[1]];
        }
    }
}
