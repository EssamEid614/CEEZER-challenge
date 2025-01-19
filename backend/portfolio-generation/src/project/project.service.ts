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
    let portfolios: PortfolioDto[] = projects.map(project => ({ project, tons: 0 }))
    let shortfall = 0
    let tonsToAssign = requestedTons
    while (true) {
      if (shortfall != 0) {
        tonsToAssign = shortfall
        shortfall = 0
      }
      let totalPercentagesForRedistrbution = 0
      for (let index = 0; index < portfolios.length; index++) {
        const portfolio = portfolios[index];
        let tonsForPortfolioWantToAssign = tonsToAssign * portfolio.project.distributionWeight
        const tonsForPortfolioWavailableToAssign = portfolio.project.offeredVolumeInTons - portfolio.tons
        if (tonsForPortfolioWavailableToAssign > 0) {
          // Can still assign more tons to this project/portfolio
          if (tonsForPortfolioWantToAssign > tonsForPortfolioWavailableToAssign) {
            // This means that what we would like to assign is greater than the available, in this case we want to assign all the available.
            portfolio.tons = portfolio.tons + tonsForPortfolioWavailableToAssign
            shortfall = tonsForPortfolioWantToAssign - portfolio.tons + shortfall
          }
          else {
            // Here we can assign while still having spares 
            totalPercentagesForRedistrbution += portfolio.project.distributionWeight
            portfolio.tons = portfolio.tons + tonsForPortfolioWantToAssign
          }
        }

      }
      if (shortfall === 0 || this.checkIfAllFullyAssigned(portfolios)) {
        break
      }
      else {
        portfolios = this.redistrbutePercentage(portfolios, totalPercentagesForRedistrbution)
      }
    }

    return portfolios

  }

  private redistrbutePercentage(portfolios: PortfolioDto[], totalPercentagesForRedistrbution: number): PortfolioDto[] {
    return portfolios.map((portfolio) => {
      if (portfolio.tons < portfolio.project.offeredVolumeInTons) {
        portfolio.project.distributionWeight = portfolio.project.distributionWeight / totalPercentagesForRedistrbution
      }
      return portfolio
    })
  }

  private checkIfAllFullyAssigned(portfolios: PortfolioDto[]): boolean {
    for (let index = 0; index < portfolios.length; index++) {
      const portfolio = portfolios[index];
      if (portfolio.tons < portfolio.project.offeredVolumeInTons) {
        return false
      }
    }
    return true
  }



}
