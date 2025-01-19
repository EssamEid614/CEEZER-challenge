import { Test, TestingModule } from "@nestjs/testing";
import { ProjectService } from "./project.service";
import { mock } from 'jest-mock-extended';
import { ProjectRepository } from "./projects.repository";
import * as jsonData from './projects.json';
import { plainToInstance } from "class-transformer";
import PortfolioDto from "./dtos/portofolio.dto";
import ProjectDto from "./dtos/project.dto";
describe('generatePortfolio', () => {
    let module: TestingModule;
    let service: ProjectService;
    const projectRepoMock = mock<ProjectRepository>();
    const mockedProjects = plainToInstance(ProjectDto, jsonData)
    beforeAll(async () => {

        module = await Test.createTestingModule({
            imports: [],
            providers: [
                ProjectService,
                {
                    provide: ProjectRepository,
                    useValue: projectRepoMock
                },
            ]
        })
            .compile();

        service = await module.resolve(ProjectService);
    });

    afterAll(async () => {
        await module.close();
    })

    beforeEach(() => {
        projectRepoMock.getProjects.mockReturnValueOnce(mockedProjects)
    })
    it.each([{ name: 'be able to calculate tons and return portfolios', input: { requestedTons: 60 }, expected: [{ "earliestDelivery": "2023-09-01", "imageUrl": "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_imageUrls/Fugitives/38bb530f5caf513be9f2a41f2d909f47-min.jpeg", "pricePerTon": 650, "projectId": 1, "supplierName": "Klom", "tons": 3 }, { "earliestDelivery": "2022-04-01", "imageUrl": "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_imageUrls/Mineralisation/ben-karpinski-ctWw2S9VqOI-unsplash-min.jpg", "pricePerTon": 200, "projectId": 2, "supplierName": "Klom", "tons": 6 }, { "earliestDelivery": "2024-01-01", "imageUrl": "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_imageUrls/Afforestation+reforestation/marita-kavelashvili-ugnrXk1129g-unsplash-min.jpg", "pricePerTon": 50.85, "projectId": 3, "supplierName": "EcoCarbon", "tons": 9 }, { "earliestDelivery": "2023-05-15", "imageUrl": "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_imageUrls/Climate+fund/climate-fund.png", "pricePerTon": 25, "projectId": 4, "supplierName": "Pure Planet", "tons": 15 }, { "earliestDelivery": "2023-12-01", "imageUrl": "https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_imageUrls/Renewable+energy/andreas-gucklhorn-Ilpf2eUPpUE-unsplash-min.jpg", "pricePerTon": 10.5, "projectId": 5, "supplierName": "Carbon Solutions", "tons": 27 }] }])(
        'should $name',
        ({ input, expected }) => {
            expect(service.generatePortfolio(input)).toEqual(expected);
        }
    );

})