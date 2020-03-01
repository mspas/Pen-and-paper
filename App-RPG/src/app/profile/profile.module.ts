import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { PersonalDataResolve } from "./profile.resolve.service";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule],
  providers: [PersonalDataResolve]
})
export class ProfileModule {}
