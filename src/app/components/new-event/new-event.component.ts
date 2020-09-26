import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { NgForm } from  "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Event } from '../../service/event.model';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  private mode = 'create';
  private eventId: string;
  event: Event;

  constructor(public dataService:DataService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('eventId')) {
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.event = this.dataService.getEvent(this.eventId);
      }else {
        this.mode = 'create';
        this.eventId = null;
      }

      if(this.mode === 'create') {
        this.event = {
          title: '',
          date: '',
          info: '',
          category: '',
          imgURL: '',
          id: ''
        }
      }
    });
  }


  addSaveEvent(form: NgForm) {
    
    // if(form.invalid){return}
    if(this.mode === 'create') {
      const newEvent = {
        title: form.value.title,
        date: form.value.date,
        category: form.value.category,
        imgURL: form.value.imgUrl,
        info: form.value.info
      }
      this.dataService.addEvent(newEvent);
    }else {
      const editEvent = {
        title: form.value.title,
        date: form.value.date,
        category: form.value.category,
        imgURL: form.value.imgUrl,
        info: form.value.info,
        id: this.eventId
      }
      this.dataService.updateEvent(editEvent);
    }

    //back to home page
    this.router.navigate(['/']);
  }  
}
