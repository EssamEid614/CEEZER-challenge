import { Type } from "class-transformer";
import ProjectDto from "./project.dto";

export default class PortfolioDto {
    @Type(() => ProjectDto)
    project: ProjectDto;
    tons: number;
}