import { Inject, Injectable } from '@nestjs/common';
import ProjectDto from './dtos/project.dto';
import { ProjectRepository } from './projects.repository';
import PortfolioCreateDto from './dtos/portofolio-create.dto';
import PortfolioDto from './dtos/portofolio.dto';

@Injectable()
export class ProjectService {
  @Inject()
  projectRepo: ProjectRepository

  listProjects(): ProjectDto[] {
    return this.projectRepo.getProjects()
  }

  generatePortfolio(data: PortfolioCreateDto): PortfolioDto[] {
    const projects = this.projectRepo.getProjects()
    const { requestedTons } = data
    projects.sort((projectA, projectB) => projectA.distributionWeight - projectB.distributionWeight)

    return projects.map(project => {
      const tons = requestedTons * project.distributionWeight
      return {
        tons,
        projectId: project.id,
        imageUrl: project.imageUrl,
        supplierName: project.supplierName,
        earliestDelivery: project.earliestDelivery,
        pricePerTon: project.pricePerTon
      }
    })
  }



}
