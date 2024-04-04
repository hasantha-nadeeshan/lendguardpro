import React from 'react'
import {formatDateTime} from './util';
const Card = ({ jobCard }) => {
    console.log(jobCard, 'from list');
    const wrapperStyles = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      };
    return (
        <div className='card-container' style={wrapperStyles}>
            <div className="timestamp">

                last updated : {jobCard.timestamp} <br />
                Income : {jobCard.income} <br />
                Expenses : {jobCard.expense} <br />
                Finance Amount: {jobCard.finAmount} <br />
                Safe : {jobCard.is_default==0 ? `yes` : `No`}<br />
                Safe Amount : {jobCard.safeAmount} <br />
                Safe Factor : {jobCard.safeFactor} <br />
            </div>
        </div>
    )};

export default Card;