import React from 'react';
import ProjectCard from '../../components/project-card/project-card.component';
import useAxios from 'axios-hooks';
import ProjectDto from '../../utils/interface/project.interface';

const ProjectsPage = () => {
    /* - destructuring to get only data should be better with handling cases for errors to throw an error and probably capture it 
    with something like react-error-boundry for safety. Displaying some error component with a button to refresh the page
    capturing the exception and sending it to something like sentry to alert us of something missbehaving. Then we can take 
    actions accordingly. 
    - There should be also handling for loading to display some loader (preferably a skeleton) of the card that its loading and
    then properly display the data after it is fetched.
    /*/
    const [{ data }] = useAxios('/projects')
    
    const mapProjects = () => data.map((project: ProjectDto) => <ProjectCard
        key={project.id}
        project={project}

    />)
    return (
        <div className='align-items-center justify-content-center d-flex flex-column'>
            <h2>Available Projects</h2>
            <a href="https://www.maddisoncreative.co.uk/wp-content/uploads/2021/03/inspired_graphic_design.jpg">(We need a UI Designer)</a>
            {data && mapProjects()}
        </div >
    );
}

export default ProjectsPage;
