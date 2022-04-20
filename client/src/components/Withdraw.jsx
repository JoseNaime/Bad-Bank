import React, {useState} from 'react';
import {UserContext} from "../App";
import TransactionHistoryCard from "./TransactionHistoryCard";
import Card from "./Card";

function Withdraw() {
    const {userContext, setUserContext} = React.useContext(UserContext);
    const [userInput, setUserInput] = useState(null)
    const [error, setError] = useState("")
    const user = userContext.users.find(user => user.id === userContext.currentUser);

    function handleWithdraw(e) {
        e.preventDefault();
        const amount = e.target.amount.value;
        const newBalance = Number(user.balance) - Number(amount);
        if (newBalance >= 0) {

            setUserContext({
                ...userContext,
                users: userContext.users.map(user => user.id === userContext.currentUser ? {
                    ...user,
                    balance: newBalance,
                    withdraws: [...user.withdraws, {
                        amount: amount,
                        date: new Date().toLocaleDateString()
                    }]
                } : user)
            });
            alert("Withdraw completed successfully!");
        } else {
            setError("Insufficient funds")
        }
        setUserInput("")
    }

    const userWithdrawElements = user && user.withdraws.map((withdraw, i) => {
        return (
            <TransactionHistoryCard id={i} amount={withdraw.amount} date={withdraw.date} />)
    })

    return (
        <>
            <Card
                header={"Withdraw"}
                userContext={userContext}
                handleSubmit={handleWithdraw}
                userInput={userInput}
                setUserInput={setUserInput}
                error={error}
                setError={setError}
                transactionHistoryElements={userWithdrawElements}
                historyLength={user ? user.withdraws.length : 0} />
        </>
    );
}

export default Withdraw;