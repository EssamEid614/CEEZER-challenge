import React from 'react';
import './project-card.component.css';
import { Card, Col, Image, Row } from 'react-bootstrap';
import CardContentItemComponent from './card-content-item.component';
import ProjectDto from '../../utils/interface/project.interface';

interface ProjectCardProps {
    project: ProjectDto
}

function ProjectCard(props: ProjectCardProps) {
    const { project } = props
    return (
        <Card className='projectCard m-4'>
            <Card.Body>
                <Row>
                    <Col className="align-items-center justify-content-center d-flex">
                        <Image src={project.imageUrl} fluid rounded />
                    </Col>
                    <Col>
                        <Card.Title className='mb-3'>{project.name}</Card.Title>
                        <p>{project.description}</p>
                        <CardContentItemComponent title='Country' value={project.country} />
                        <CardContentItemComponent title='Price per ton' value={project.pricePerTon.toString()} />
                        <CardContentItemComponent title='Offered volume in tons' value={project.offeredVolumeInTons.toString()} />
                        <CardContentItemComponent title='Distribution weight' value={`${project.distributionWeight * 100}%`} />
                        <CardContentItemComponent title='Supplier' value={project.supplierName} />
                        <CardContentItemComponent title='Earliest delivery' value={new Date(project.earliestDelivery).toDateString()} />

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;
