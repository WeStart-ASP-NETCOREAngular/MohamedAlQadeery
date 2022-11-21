import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from 'src/app/interfaces/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
})
export class ProjectItemComponent implements OnInit {
  project!: IProject;
  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((para) => {
      let id = para.get('id')!;
      this.project = this._projectService.GetProjectById(+id)!;
    });
  }
}
