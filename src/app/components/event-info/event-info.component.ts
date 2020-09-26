import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Event } from '../../service/event.model';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  private eventId: string;
  event: Event;

  constructor(public dataService:DataService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('eventId')) {       
        this.eventId = paramMap.get('eventId');
        this.event = this.dataService.getEvent(this.eventId);
      }
    });
  }


  onDelete() {
    this.dataService.deleteEvent(this.eventId);
    this.router.navigate(['/']);
  }

}
