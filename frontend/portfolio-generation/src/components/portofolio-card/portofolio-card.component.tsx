import React from 'react';
import './portofolio-card.component.css';
import { Card, Col, Image, Row } from 'react-bootstrap';
import CardContentItemComponent from '../project-card/card-content-item.component';
import PortfolioDto from '../../utils/interface/portofolio.interface';

interface PortofolioCardProps {
    portofolio: PortfolioDto;
}

function PortofolioCard(props: PortofolioCardProps) {
    const { portofolio: { project, tons } } = props
    return (
        <Card className='projectCard m-4'>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title className='mb-3'>{project.name}</Card.Title>
                        <p>{project.description}</p>
                        <CardContentItemComponent title='Tonnage' value={tons.toFixed(2)} />
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    );
}

export default PortofolioCard;
