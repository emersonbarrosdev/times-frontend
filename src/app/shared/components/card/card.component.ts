import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DialogComponent } from '../dialog/dialog.component';
import { CreateTeamDialogComponent } from '../create-team-dialog/create-team-dialog.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TeamService } from 'src/app/core/services/team/team.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() cardId: string = ''; // Identificador único para o card
  selectedTeams: string[] = [];
  userRole: string | null = null;
  teams: string[] = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private storageService: StorageService,
    private teamService: TeamService
  ) {
    this.userRole = this.authService.currentUserValue?.role || null;
  }

  ngOnInit() {
    this.loadSelectedTeams();
    this.teams = this.teamService.getTeams();
  }

  private loadSelectedTeams() {
    this.selectedTeams =
      this.storageService.getItem(`selectedTeams_${this.cardId}`) || [];
  }

  openModal(mode: 'REMOVE' | 'EDIT' | 'CREATE') {
    if (mode === 'CREATE') {
      const dialogRef = this.dialog.open(CreateTeamDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.teamService.addTeam(result);
          this.teams = this.teamService.getTeams(); // Atualiza a lista de times
        }
      });
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          mode,
          cardId: this.cardId,
          message:
            mode === 'REMOVE'
              ? 'Tem certeza que deseja remover todos os times selecionados?'
              : 'Este é o conteúdo do modal!',
          selectedTeams: mode === 'EDIT' ? this.selectedTeams : null,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.action === 'save') {
          if (mode === 'EDIT') {
            this.selectedTeams = result.selectedTeams;
            this.storageService.setItem(
              `selectedTeams_${this.cardId}`,
              this.selectedTeams
            );
          } else if (mode === 'REMOVE') {
            this.selectedTeams = [];
            this.storageService.setItem(
              `selectedTeams_${this.cardId}`,
              this.selectedTeams
            );
          }
        }
      });
    }
  }
}
