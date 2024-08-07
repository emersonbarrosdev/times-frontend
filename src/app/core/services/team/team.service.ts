import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly defaultTeams = [
    'Real Madrid',
    'Barcelona',
    'Manchester United',
  ];
  private teams: string[] = [];

  constructor(private authService: AuthService) {
    this.loadTeams();
  }

  private loadTeams(): void {
    const currentUser = this.authService.currentUserValue;
    const storedTeams = currentUser
      ? localStorage.getItem(`teams_${currentUser.username}`)
      : null;
    this.teams = storedTeams ? JSON.parse(storedTeams) : [...this.defaultTeams];
  }

  private saveTeams(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      localStorage.setItem(
        `teams_${currentUser.username}`,
        JSON.stringify(this.teams)
      );
    }
  }

  getTeams(): string[] {
    return this.teams;
  }

  addTeam(team: string): void {
    if (team && !this.teams.includes(team)) {
      this.teams.push(team);
      this.saveTeams();
    }
  }

  clearTeams(): void {
    this.teams = [];
    this.saveTeams();
  }

  updateSelectedTeams(selectedTeams: string[]): void {
    this.teams = selectedTeams;
    this.saveTeams();
  }
}
