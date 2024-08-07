import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TeamService } from 'src/app/core/services/team/team.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  teams: string[] = [];
  selectedTeams: string[] = [];
  initialSelectedTeams: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storageService: StorageService,
    private teamService: TeamService
  ) {
    this.teams = this.teamService.getTeams();
    this.loadSelectedTeams();
  }

  private loadSelectedTeams() {
    const storedTeams = this.storageService.getItem(
      `selectedTeams_${this.data.cardId}`
    );
    if (storedTeams) {
      this.initialSelectedTeams = [...storedTeams];
      this.selectedTeams = [...this.initialSelectedTeams];
    } else if (this.data.selectedTeams) {
      this.initialSelectedTeams = [...this.data.selectedTeams];
      this.selectedTeams = [...this.initialSelectedTeams];
    }
  }

  onCheckboxChange(event: any, team: string) {
    if (event.checked) {
      this.addTeam(team);
    } else {
      this.removeTeam(team);
    }
  }

  private addTeam(team: string) {
    if (!this.selectedTeams.includes(team)) {
      this.selectedTeams.push(team);
    }
  }

  private removeTeam(team: string) {
    const index = this.selectedTeams.indexOf(team);
    if (index >= 0) {
      this.selectedTeams.splice(index, 1);
    }
  }

  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  save() {
    if (this.data.mode === 'REMOVE') {
      this.selectedTeams = [];
    }
    this.storageService.setItem(
      `selectedTeams_${this.data.cardId}`,
      this.selectedTeams
    );
    this.dialogRef.close({ action: 'save', selectedTeams: this.selectedTeams });
  }
}
