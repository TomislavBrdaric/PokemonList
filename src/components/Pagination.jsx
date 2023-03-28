import React from 'react';
import './Pagination.css';

const Pagination = ({ goToNextPage, goToPrevPage }) => {
    return (
        <div className='buttons'>
            {goToPrevPage && (
                <button id='previousBtn' onClick={goToPrevPage}>
                    Previous
                </button>
            )}
            {goToNextPage && (
                <button id='nextBtn' onClick={goToNextPage}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
