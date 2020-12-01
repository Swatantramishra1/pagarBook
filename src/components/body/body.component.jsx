import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-responsive-modal';

import { selectListData, selectModalStatus, selectTotalExpenses, updateExpenses, updateModalStatus } from "../data/expenseManagerSlice";
import { ExpenseManagerComponent } from "./expense_manager/expense_manager.component"
import { NoEntryComponent } from "./no-entry/no.entry.component"
import { ListComponent } from "./list/list.component";

import "react-responsive-modal/styles.css";


export const BodyComponent = () => {

    const [paid, setPaid] = useState(false);
    const [recieve, setRecieve] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [discription, setDisc] = useState("");
    const [date, setDate] = useState("");

    const [showList, setShowList] = useState(false);

    const [todayDate, setTodayDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const dispatch = useDispatch();
    const expenses = useSelector(selectTotalExpenses);
    const selectList = useSelector(selectListData);
    const selectModalCurrentStatus = useSelector(selectModalStatus);

    useEffect(() => {
        let date = new Date();
        date = date.toISOString().substring(0,10);
        setTodayDate(date);
    },[])
 
    const onCloseModal = () => {
        setErrorMessage("");
        dispatch(updateModalStatus(false))
    }

    const onSetPaid = () => {
        setPaid(!paid);
    }

    const onSetRecieve = () => {
        setRecieve(!recieve);
    }

    const onChangeNameInput = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const onChangeAmountInput = (e) => {
        const value = e.target.value;
        setAmount(value);
    }

    const onChangeDiscInput = (e) => {
        const value = e.target.value;
        setDisc(value);
    }

    const onChangeDateInput = (e) => {
        const value = e.target.value;
        setDate(value);
    }


    function setInitialState() {
        setPaid(false);
        setRecieve(false);
        setAmount(0);
        setName("");
        setDisc("");
        setDate("")
    }


    const validation = () => {
        if(!paid && !recieve) {
            setErrorMessage("Please select Transaction Type");
            return false;
        }

        if(name.trim().length === 0) {
            setErrorMessage("Enter name")
            return false;
        }

        if(amount === 0) {
            setErrorMessage("Enter valid amount")
            return false;
        }

        if(!date) {
            setErrorMessage("Select valid date")
            return false;
        }

        setErrorMessage("");
        return true;
    }


    const onSave = () => {

        if(validation()) {
            let amountData = 0;
            if(paid) {
                amountData = Number(expenses.paid) + Number(amount);
            } else {
                amountData =  Number(expenses.recieve) +  Number(amount)
            }
    
            const data = {
                totalPaid: paid ? amountData : expenses.paid,
                totalRecieve: recieve ? amountData : expenses.recieve,
              }
    
              const listData = JSON.parse(JSON.stringify(selectList));
              const randomId = Math.random() + "d";
              const dataObj =  {
                "transaction-type": paid ? "paid" : "recieve",
                "name":name,
                "discription": discription,
                "amount": amount,
                "date": date,
                id: randomId
            };
            
            if(listData && listData.hasOwnProperty(date)) {
                listData[date].push(
                    dataObj
                )
            } else {
                listData[date] ={};
                listData[date] = [dataObj]
            }
            
    
            data.list = listData;
    
            dispatch(updateExpenses(data))
            onCloseModal();
            setInitialState();
            setShowList(true)
        }  
    }










    return(
        <div className="body">
        <ExpenseManagerComponent></ExpenseManagerComponent>
        
        {showList ? <ListComponent></ListComponent> : <NoEntryComponent></NoEntryComponent>}
        <Modal open={selectModalCurrentStatus} onClose={onCloseModal} center>
            <div className="formContainer">
                <div className="input">
                 <div className="label">Transaction Type</div>
                   <div className="checkbox-container"> 
                    <div className="checkbox">
                    <input type="checkbox" id="paid" name="paid" value="paid" onChange={onSetPaid} /><label for="paid"> You Paid</label>
                    </div>
                    <div className="checkbox">
                    <input type="checkbox" id="paid" name="took" value="took" onChange={onSetRecieve}  /><label for="took"> You Took</label>
                    </div>
                     </div>                   
                </div>   

                <div className="input">
                 <div className="label">Name</div>
                 <input type="text" id="name" name="name" placeholder="Type Name" value={name} onChange={(e) => onChangeNameInput(e)} />
                </div>   

                <div className="input">
                 <div className="label">Amount</div>
                 <input type="number" id="amount" name="amount" placeholder="Amount" value={amount} onChange={(e) => onChangeAmountInput(e)} />
                </div>   

                <div className="input">
                 <div className="label">Discription</div>
                 <input type="text" id="disc" name="disc" value={discription} placeholder="Discription" onChange={(e) => onChangeDiscInput(e)} />
                </div>   

                <div className="input">
                 <div className="label">Date</div>
                 <input type="date" id="date" name="date" value={date} max={todayDate} onChange={(e) => onChangeDateInput(e)} />
                </div>  
                {errorMessage.length > 0 ? <div className="error"> {errorMessage}
                </div> : ""}
                

                <div className="action">
                    <button className="save" onClick={onSave}>Save</button>
                    <button onClick={onCloseModal}>Cancel</button>
                </div>

                </div>
        </Modal>
        </div>
    )
}