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
  messages: { name: string; message: string }[] = [];
  // userList: { connectionId: string; username: string }[] = [];
  userList: string[] = [];
  hubConnection: HubConnection;

  constructor(public _authService: AuthService) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this._authService.onLoggedInEvent.subscribe(() => {
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

      this.hubConnection.on('onMessageRecived', (user, message) => {
        this.messages.push({ name: user, message: message });
        console.log('message recesvied');
      });

      this.hubConnection.on('onConnectedClientsUpdated', (users) => {
        this.userList = users;
      });

      // this.hubConnection.on('onConnectedClientsUpdated', (users: string[]) => {
      //   users.forEach((u) =>
      //     this.userList.push({
      //       connectionId: u,
      //       username: this._authService.GetUsername(),
      //     })
      //   );
      // });
    });
  }

  SendMessage() {
    const { message } = this.messageForm.value;

    this.hubConnection.invoke(
      'SendMessageToAll',
      this._authService.GetUsername(),
      message
    );
    this.messageForm.reset();
    console.log('Sending message.......');
  }
}
