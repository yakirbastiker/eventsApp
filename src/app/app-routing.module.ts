import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { EventsComponent } from './components/events/events.component';
import { NewEventComponent } from './components/new-event/new-event.component';
 
const routes: Routes = [
  {path: '', component: EventsComponent},
  {path:'createEvent', component: NewEventComponent },
  {path: 'info/:eventId', component: EventInfoComponent},
  {path: 'edit/:eventId', component: NewEventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
