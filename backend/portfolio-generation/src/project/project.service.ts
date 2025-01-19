import { Inject, Injectable } from '@nestjs/common';
import ProjectDto from './dtos/project.dto';
import { ProjectRepository } from './projects.repository';
import PortfolioCreateDto from './dtos/portofolio-create.dto';

@Injectable()
export class ProjectService {

  @Inject()
  projectRepo: ProjectRepository

  listProjects(): ProjectDto[] {
    return this.projectRepo.getProjects()
  }



}
