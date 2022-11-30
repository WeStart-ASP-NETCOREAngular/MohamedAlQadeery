import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'signalr-angular';
  messageForm: FormGroup;
  messages: string[] = [];
  hubConnection: HubConnection;
  constructor(public _authService: AuthService) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7248/chathub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  SendMessage() {}
}
