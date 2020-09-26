import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from '../../service/event.model';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  events: Event[] = [];
  showEvents: Event[]= [];
  public category= {
    all:true,
    music: false,
    coding: false
  };

  private eventsSub: Subscription;
  constructor(public dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getEvents();
    this.eventsSub = this.dataService.getPostUpdateListener()
      .subscribe((events: Event[]) => {
        this.events = events;
        this.showEvents = events;
      });
  }

  onDelete(eventId: string) {
    this.dataService.deleteEvent(eventId);
  }

  filterSelected(categorySelected: string){
    this.category.all = false;
    this.category.music = false;
    this.category.coding = false;

    this.category[categorySelected] = true;


    //change events
    if(categorySelected === 'all') {
      this.showEvents = this.events;
    }else {
      this.showEvents = this.events.filter( category => category.category === categorySelected);
    }  
  }

  truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '..' : str;
  };
  

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

}
