import React from 'react';

function TransactionHistoryCard({id,amount, date}) {
    return (
        <div key={id} className="row mt-3">
            <div className="d-flex d-inline-flex justify-content-between col-10 m-auto border-bottom">
                <h5 className="mb-1">${amount}</h5>
                <aside>
                    <p className="mb-2 text-muted">{date}</p>
                </aside>
            </div>
        </div>
    );
}

export default TransactionHistoryCard;