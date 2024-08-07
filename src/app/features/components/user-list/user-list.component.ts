import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUser } from 'src/app/shared/interfaces/iuser';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: MatTableDataSource<IUser>;
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = new MatTableDataSource(data);
    });
  }

  editUser(user: IUser): void {
    // Lógica para editar usuário
  }

  deleteUser(user: IUser): void {
    // Lógica para deletar usuário
  }
}
