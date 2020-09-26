import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { Event } from './event.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
    private events: Event[] = [];
    private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient) { }

  getEvents(){
    this.http.get<{message: string, events: any}>('http://localhost:3000/api/events')
    .pipe(map((eventData)=> {
      return eventData.events.map(event => {
        return {
          title: event.title,
          date: event.date,
          info: event.info,
          imgURL: event.imgURL,
          id: event._id,
          category: event.category
        }
      });
    }))
    .subscribe((transformedEvents) => {
      this.events = transformedEvents;
      this.eventsUpdated.next([...this.events]);
    });
    // console.log(this.events)
  }

  getPostUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  addEvent(event) {
    this.http.post('http://localhost:3000/api/events', event)
      .subscribe((responseData)=> {
        this.events.push(event);
        this.eventsUpdated.next([...this.events]);
      });
  }

  deleteEvent(eventId: string) {
    this.http.delete("http://localhost:3000/api/events/" + eventId)
      .subscribe(() => {
        // console.log("event deleted");
        const updateEvents = this.events.filter(event => event.id !== eventId);
        this.events = updateEvents;
        this.eventsUpdated.next([...this.events]);

      });
  }

  getEvent(id: string) {
    return {...this.events.find(e => e.id === id)};
  }


  updateEvent(event:Event){
    const eventId:string = event.id;
    this.http.put("http://localhost:3000/api/events/" + eventId, event)
    .subscribe(response => console.log(response));
  }

}
