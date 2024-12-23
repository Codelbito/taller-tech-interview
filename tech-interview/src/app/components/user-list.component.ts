import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  // Users state
  users$!: Observable<User[]>;
  // Loading state
  loading$ = this.userService.loading$;

  searchForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    // Init form
    this.searchForm = this.fb.group({
      search: [''],
    });

    // Listen for input changes
    this.users$ = combineLatest([
      this.userService.users$,
      this.searchForm.controls['search'].valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([users, searchTerm]) =>
        users.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );

    // Fetch user data
    this.userService.fetchUsers();
  }
}
