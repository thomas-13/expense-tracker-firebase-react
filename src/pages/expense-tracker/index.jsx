import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import './styles.css';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
    const navigate = useNavigate()

    //we go through the hassle of creating custom hooks because in the real world, the UI and code logic
    //should be kept seperate.
    //So while testing components, we can test the UI and logic also seperately.
    const { addTransaction } = useAddTransaction();
    const {transactions, transactionTotals} = useGetTransactions();
    const {balance, income, expense} = transactionTotals
    const {name, profilePhoto} =  useGetUserInfo();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType
        })
        setTransactionAmount("");
        setDescription("");
    }

    const signUserOut = async () =>{
        try{
            await signOut(auth)
            localStorage.clear()
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your balance</h3>
                        {balance>=0 ? 
                        <h2>${balance}</h2> :
                        <h2>-${balance * -1}</h2>
                        }
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expense}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" value={description} required onChange={
                            e => setDescription(e.target.value)
                        } />
                        <input type="number" placeholder="Amount" value={transactionAmount} required onChange={
                            e => setTransactionAmount(e.target.value)
                        } />
                        <input
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={transactionType === "expense"}
                            onChange={e => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense">Expense</label>
                        <input
                            type="radio"
                            id="income"
                            value="income"
                            checked={transactionType === "income"}
                            onChange={e => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income" value="income">Income</label>
                        <button type="submit">Add Transaction</button>

                    </form>
                </div>
                {profilePhoto && <div className="profile">
                    <img className="profile-photo" src={profilePhoto} alt="profile"/>
                    <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
                    </div>}
            </div>
            <div className="transactions">
                <h3>Transcations</h3>
                <ul>
                    {transactions.map((e)=>{
                        return (
                        <li>
                            <h4>{e.description}</h4>
                            <p>${e.transactionAmount} | <label style={{color: e.transactionType === "expense" ? "red" : "green"}}>{e.transactionType}</label></p>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}