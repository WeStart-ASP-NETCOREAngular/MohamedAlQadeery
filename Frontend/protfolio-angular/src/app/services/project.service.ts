import { Injectable } from '@angular/core';
import { IProject } from '../interfaces/IProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _project: IProject[] = [
    {
      id: 1,
      title: 'First Project',
      image: './assets/project-1.png',
    },
    {
      id: 2,
      title: 'Second Project',
      image: './assets/project-1.png',
    },
    {
      id: 3,
      title: 'Thrid Project',
      image: './assets/project-1.png',
    },
  ];
  constructor() {}

  public GetAllProjects(): IProject[] {
    return this._project;
  }

  public GetProjectById(id: number): IProject | undefined {
    return this._project.find((p) => p.id == id);
  }
}
