import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ChatComponent} from "./components/chat/chat.component";
import {ErrorComponent} from "./components/error/error.component";

export const routes: Routes = [

  {
    path: "chat",
    component: ChatComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

