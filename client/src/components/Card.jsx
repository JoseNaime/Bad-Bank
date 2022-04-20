import React, {useState} from 'react';

function Card({header, userContext, handleSubmit, userInput, setUserInput,error, setError, transactionHistoryElements, historyLength}) {

    const user = userContext.users.find(user => user.id === userContext.currentUser);

    function handleUserInputChange(e){
        let input = e.target.value
        if (input < 0){
            input *= -1
        }
        setUserInput(input)
    }

    return (
        <>
            <h1>{header}</h1>
            {userContext.currentUser !== null ?
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <h2>{user.username}</h2>
                                <p>Current Balance: ${user.balance}</p>
                            </div>
                            <form onSubmit={handleSubmit} className="position-relative">
                                <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                    <input type="number"
                                           className="form-control"
                                           onChange={handleUserInputChange}
                                           onFocus={() => setError("")}
                                           value={userInput}
                                           id="amount"
                                           placeholder="Enter Amount" />
                                    <p className="text-danger">{error} </p>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2 m-auto" disabled={!userInput}>
                                    {header}
                                </button>
                            </form>
                        </div>
                    </div>
                    {historyLength > 0 &&
                        <div>
                            <div className="card my-3">
                                <div className="card-body m-3">
                                    <h3 className="card-title mb-3 text-center">History</h3>
                                    <div>
                                        {transactionHistoryElements}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <>
                    <h4 className="text-muted">Please create an account</h4>
                </>
            }
        </>
    );
}

export default Card;