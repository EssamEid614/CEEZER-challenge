import React from 'react'
import { Card } from "react-bootstrap"

interface CardContentItemComponentProps {
    title: string
    value: string
}
const CardContentItemComponent = ({ title, value }: CardContentItemComponentProps) => {
    return <p className='mb-2'><strong>{title}:</strong> {value}</p>
}

export default CardContentItemComponent