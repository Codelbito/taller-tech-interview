import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  template: `<app-user-list></app-user-list>`,
})
export class AppComponent {
  title = 'tech-interview';
}
