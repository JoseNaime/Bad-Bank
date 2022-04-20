import React, {useState} from 'react';
import {UserContext} from "../App";
import TransactionHistoryCard from "./TransactionHistoryCard";
import Card from "./Card";

function Deposit() {
    const {userContext, setUserContext} = React.useContext(UserContext);
    const [userInput, setUserInput] = useState(null)
    const [error, setError] = useState("")
    const user = userContext.users.find(user => user.id === userContext.currentUser)

    function handleDeposit(e) {
        e.preventDefault();
        const amount = e.target.elements.amount.value;
        const newBalance = Number(user.balance) + Number(amount);
        setUserContext({
            ...userContext,
            users: userContext.users.map(user => user.id === userContext.currentUser ? {
                ...user,
                balance: newBalance,
                deposits: [...user.deposits, {
                    amount: amount,
                    date: new Date().toLocaleDateString()
                }]
            } : user)

        });
        setUserInput("")
        alert("Deposit completed successfully!");
    }


    const userDepositsElements = user && user.deposits.map((deposit, i) => {
        return (
            <TransactionHistoryCard id={i} amount={deposit.amount} date={deposit.date} />)
    })

    return (
        <>
            <Card
                header={"Deposit"}
                userContext={userContext}
                handleSubmit={handleDeposit}
                userInput={userInput}
                setUserInput={setUserInput}
                error={error}
                setError={setError}
                transactionHistoryElements={userDepositsElements}
                historyLength={user ? user.deposits.length : 0} />
        </>
    );
}

export default Deposit;