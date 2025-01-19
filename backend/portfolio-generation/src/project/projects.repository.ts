import { Injectable } from '@nestjs/common';
import ProjectDto from './dtos/project.dto';
import * as jsonData from './projects.json';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProjectRepository {
    getProjects(): ProjectDto[] {
        return plainToInstance(ProjectDto, jsonData);
    }

}
