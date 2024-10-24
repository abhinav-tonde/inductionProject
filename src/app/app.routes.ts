import { Routes } from '@angular/router';
import { ScheduleReportComponent } from './schedule-report/schedule-report.component';
import { SelectTimerComponent } from './select-timer/select-timer.component';
import { ConfirmationMsgComponent } from './confirmation-msg/confirmation-msg.component';

export const routes: Routes = [
    {path:"", component:ScheduleReportComponent},
    {path:"timer", component:SelectTimerComponent},
    {path:"confirm", component:ConfirmationMsgComponent},
];
