import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleReportComponent } from './schedule-report/schedule-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inductionProject';

  private modalService = inject(NgbModal);

	open() {
		const modalRef = this.modalService.open(ScheduleReportComponent);
		modalRef.componentInstance.name = 'World';
	}
}
