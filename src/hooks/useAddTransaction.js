import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = ()=>{
    const transactionCollectionRef = collection(db, "transactions")
    // 'transactions' is the name specified in the firebase db

    const {userID} = useGetUserInfo();

    const addTransaction = async({
        description,
        transactionAmount,
        transactionType
    }) => {
        await addDoc(transactionCollectionRef,{
            userID: userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    };
    return { addTransaction};
}