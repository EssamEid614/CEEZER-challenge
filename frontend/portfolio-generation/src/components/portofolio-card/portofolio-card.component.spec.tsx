import React from 'react';
import { render, screen } from '@testing-library/react';
import PortofolioCard from './portofolio-card.component';
import PortfolioDto from '../../utils/interface/portofolio.interface';

describe('PortofolioCard Component', () => {
    const mockPortfolio = {
        project: {
            name: 'Project Alpha',
            description: 'This is a test project description.',
        },
        tons: 123.456,
    };

    test('should render portofolio details correctly', () => {
         render(<PortofolioCard portofolio={mockPortfolio as PortfolioDto} />);

        
        const titleElement = screen.getByText('Project Alpha');
        const descriptionElement = screen.getByText('This is a test project description.');
        const tonnageElement = screen.getByText('123.46');
        
        
        expect(descriptionElement).toBeInTheDocument();
        expect(titleElement).toBeInTheDocument();        
        expect(tonnageElement).toBeInTheDocument();
    });
});