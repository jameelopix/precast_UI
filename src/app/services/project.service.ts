import { Injectable } from '@angular/core';

import { ProjectDTO } from '../model/project-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';
import { ProjectSearchDTO } from '../model/project-search-dto';

const DELETE_URL: string = 'deleteProject';
const GET_URL: string = 'getProject';
const SAVE_URL: string = 'createProject';
const UPDATE_URL: string = 'updateProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private clientService: ClientService) { }

  save(value: ProjectDTO, callback) {
    var request: any = {
      "projectDTO": value
    };

    let url = SAVE_URL;
    if (value.id) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, callback);
  }

  delete(id: number, callback) {
    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.clientService.post(DELETE_URL, { idsToDelete: [id] }, callback);
    }
  }

  get(projectSearchDTO: ProjectSearchDTO, callback) {
    var request: any = {
      "projectSearchDTO": projectSearchDTO
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
