import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({balance:0.0, income:0.0, expense:0.0});

    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();


    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            //onSnapshot keeps track of a query if there are changes
            unsubscribe = onSnapshot(queryTransactions,(snapshot)=>{
                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0
                //snapshot contains a lot of data, but not in the required list format, hence we loop through each
                snapshot.forEach((doc)=>{
                    const data  = doc.data(); //getting data of each document
                    const id = doc.id;

                    docs.push({...data, id});

                    if(data.transactionType ==="expense"){
                        totalExpense += Number(data.transactionAmount);
                    } else{
                        totalIncome += Number(data.transactionAmount)
                    }
                });
                setTransactions(docs);
                let balance = totalIncome - totalExpense
                setTransactionTotals({
                    balance,
                    income: totalIncome,
                    expense: totalExpense
                })
            });

        } catch (err) {
            console.error(err);
        }
        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions();
    }, [])

    return { transactions, transactionTotals };
}