import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import ProjectDto from './dtos/project.dto';
import PortfolioCreateDto from './dtos/portofolio-create.dto';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    listProjects(): ProjectDto[] {
        return this.projectService.listProjects()
    }


}
