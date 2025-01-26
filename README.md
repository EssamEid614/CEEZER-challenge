# CEEZER coding challenge

## Stack used 

 - **Backend**: NestJS with `NPM` as the package manager
 - **Frontend**: React with `YARN` as the package manager 

 ## How to run it 

 ### Install dependencies
  - First install dependencies in the root directory to be able to run both frontend and backend concurently using `npm install`
  - To install project(s) dependencies from the root directory 
    - `npm run bootstrap:frontend` to install frontend dependencies only.
    - `npm run bootstrap:backend` to install backend dependencies only.
    - `npm run bootstrap` to install both backend and frontend dependencies (preferred).

### Running the project
  - Similarly, To run the project(s) from the root directory
    - `npm run start:frontend` to start the frontend dev server only.
    - `npm run start:backend` to start backend dev server only.
    - `npm run start` to start both dev servers (preferred).

### Running tests
  - Similarly, To run the tests
    - `npm run test:frontend` to run tests for the frontend only.
    - `npm run test:backend` to run tests for the backend only.
    - `npm run test` to start both frontend and backend (preferred).

### How it works 
 - Backend contains a single controller `ProjectsController` which has 2 `API`s. 1 for fetching the existing projects and 1 for generating the portofolios
 - There are tests covering the service behaviour with multiple scenarios(more on that in the room for improvement point).
 - Basically what happens is on requesting some portofolio generation, the service fetches the data from a (fake) repository to try to see what offered volume each project has and tries to assign it proper tonnage based on the distrbution weights.
 - If there project has available tonnage it can assign to, it will assign tonnage to mentioned project. if the project doesn't have enough tonnage, it will assign the maximum it can take and then start adding shortfalls. 
 - The shortfalls are then redistrbuted according to the weights, so the distrbution weights of the projects with still some available tonnage gets updated. 
 - Repeat untill all projects are full or until shortfall becomes 0.

 ### Possible imrpovements 
  - More tests to cover other possible scenarios but with different data .. specifically if a shortfall happens on the first time and the second time as well. I tried to get a test case for that but wasn't able to unless the numbers given are changed.
  - API validations, the API at this point doesn't validate the input. there should be api validations in place (maybe using class-validator even)
  - More tests to cover the unexpected inputs specifically in the controller level.. this goes hand in hand with the point above about the API validation.
  - At this point, there is no coverage for the `checkIfAllFullyAssigned` however i still believe it should be covered by tests. It is technically tested within the `generatePortfolio` but when covered by tests as well it can easily grab bugs if introduced... since there is no difference than writing tests down and for the sake of saving time i refrained from adding tests here and settling for tests for the `generatePortofolio` function . 
  - The UI needs to be proper .. apologies but i am not that good of a designer 🙈.
  - Since i dont fully understand the business, i am exposing all fields tho this shouldnt be the case and we should only expose from the `API` what we actually want exposed.
  - Sometimes, i felt confused on what to name some variables so excuse me for that. I need more information about the business to name stuff properly.
  - Dockerize the entire thing. This would help when it gets to the deployment stage.
  - There is a deprication warning on the frontend tests regarding the `act` usage (tho i am not using it). It would take a bit of time for me to investigate why this is happening but since the tests are already running fine and since i am short a bit on time i decided to leave it be.. for now.

### Assumptions made
 - We must get to a point where the shortfall hits 0, no matter how many loops this takes. I am assuming there is no limit to the number of redistbutions we can do.
 - only 2 pages are needed for the display, 1 to display the existing projects and 1 to calculate the portofolio.
 - There can be only 1 instance of the project when generating the portofolio. So we cannot have, for example, 2x project 1 if it will compensate for the shortfall properly. 