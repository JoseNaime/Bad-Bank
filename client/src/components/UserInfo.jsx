import React from 'react';

function UserInfo({user}) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <h5 className="card-title">Username: {user.username}</h5>
                        <h6 className="text-muted">Email: {user.email}</h6>
                    </div>

                    <div>
                        <h3>Balance: ${user.balance} </h3>
                    </div>
                </div>

                <div className="mt-5 mb-2 row d-inline-flex w-100 text-center">
                    <div className="col-6">
                        <h6>Deposits</h6>
                        <div className="border-right-4">
                            {user.deposits && user.deposits.map(deposit => {
                                return (
                                    <div className="d-flex d-inline-flex justify-content-around w-100">
                                        <p>${deposit.amount}</p>
                                        <p>{deposit.date}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-6">
                        <h6>Withdrawals</h6>
                        <div>
                            {user.withdraws && user.withdraws.map(withdraw => {
                                return (
                                    <div className="d-flex d-inline-flex justify-content-around w-100">
                                        <p>${withdraw.amount}</p>
                                        <p>{withdraw.date}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;