import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { mock } from 'jest-mock-extended';
import { ProjectRepository } from './projects.repository';
import * as jsonData from './projects.json';
import { plainToInstance } from 'class-transformer';
import ProjectDto from './dtos/project.dto';
describe('generatePortfolio', () => {
  let module: TestingModule;
  let service: ProjectService;
  const projectRepoMock = mock<ProjectRepository>();
  const mockedProjects = plainToInstance(ProjectDto, jsonData);
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [],
      providers: [
        ProjectService,
        {
          provide: ProjectRepository,
          useValue: projectRepoMock,
        },
      ],
    }).compile();

    service = await module.resolve(ProjectService);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(() => {
    projectRepoMock.getProjects.mockReturnValueOnce(mockedProjects);
  });
  it.each([
    {
      name: 'be able to calculate tons and return portfolios',
      input: { requestedTons: 60 },
      expected: [
        {
          project: {
            id: 1,
          },
          tons: 3,
        },
        {
          project: {
            id: 2,
          },
          tons: 6,
        },
        {
          project: {
            id: 3,
          },
          tons: 9,
        },
        {
          project: {
            id: 4,
          },
          tons: 15,
        },
        {
          project: {
            id: 5,
          },
          tons: 27,
        },
      ],
    },
    {
      name: 'be able to calculate tons and return portfolios when a recalculation is needed',
      input: { requestedTons: 500 },
      expected: [
        {
          project: {
            id: 1,
          },
          tons: 15,
        },
        {
          project: {
            id: 2,
          },
          tons: 51.05263157894737,
        },
        {
          project: {
            id: 3,
          },
          tons: 76.57894736842105,
        },
        {
          project: {
            id: 4,
          },
          tons: 127.63157894736842,
        },
        {
          project: {
            id: 5,
          },
          tons: 229.73684210526315,
        },
      ],
    },
    {
      name: 'be able to calculate tons and return portfolios when the requested exceeds the maximum of all projects',
      input: { requestedTons: 30000 },
      expected: [
        {
          project: {
            id: 1,
          },
          tons: 15,
        },
        {
          project: {
            id: 2,
          },
          tons: 900,
        },
        {
          project: {
            id: 3,
          },
          tons: 1500,
        },
        {
          project: {
            id: 4,
          },
          tons: 1100,
        },
        {
          project: {
            id: 5,
          },
          tons: 16000,
        },
      ],
    },
  ])('should $name', ({ input, expected }) => {
    expect(service.generatePortfolio(input)).toMatchObject(expected);
  });
});
