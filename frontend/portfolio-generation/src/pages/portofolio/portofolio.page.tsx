import useAxios from 'axios-hooks';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import PortfolioDto from '../../utils/interface/portofolio.interface';
import PortofolioCard from '../../components/portofolio-card/portofolio-card.component';
import PortfolioCreateDto from '../../utils/interface/portofolio-create.interface';

const PortofolioPage = () => {
    const [requestTonnage, setrequestTonnage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [{ loading, error, response }, executePost] = useAxios<PortfolioDto[], PortfolioCreateDto>(
        {
            url: '/projects/generatePortofolio',
            method: 'POST',
        },
        { manual: true }
    );
    const mapPortofolios = () => response?.data?.map(portofolio => <PortofolioCard portofolio={portofolio} />)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setrequestTonnage(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!requestTonnage || isNaN(Number(requestTonnage))) {
            setShowAlert(true);
            return;
        }

        setShowAlert(false);

        try {
            executePost({
                data: { requestedTons: parseInt(requestTonnage) },
            });
        } catch (err) {
            console.error('Error submitting the tonnage:', err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Submit a Number</h2>
            {showAlert && (
                <Alert variant="danger">Please enter a valid numeric value.</Alert>
            )}
            {error && (
                <Alert variant="danger">Failed to submit: {error.message}</Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="numberInput">
                    <Form.Label>Enter a Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a number"
                        value={requestTonnage}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="mt-2"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
            {mapPortofolios()}
        </div>
    );
}


export default PortofolioPage;
