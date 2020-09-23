import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "transformYesNoBoolean",
})
export class TransformYesNoBooleanPipe implements PipeTransform {
  transform(value: boolean, args?: any): any {
    if (value) return "Yes";
    else return "No";
  }
}
