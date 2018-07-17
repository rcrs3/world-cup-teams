import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TeamService }  from '../team.service';
import { Team } from '../team'

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
  providers: [TeamService]
})
export class TeamDetailComponent implements OnInit {
  team: Team = new Team();

  constructor(private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.params['_value']['id'];

    this.teamService.getTeam(id)
      .subscribe(team => this.team = team);
  }
  
}
