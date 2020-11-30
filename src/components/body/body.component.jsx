import { useState } from "react";
import { ExpenseManagerComponent } from "./expense_manager/expense_manager.component"
import { NoEntryComponent } from "./no-entry/no.entry.component"
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalExpenses, updateExpenses } from "../data/expenseManagerSlice";


export const BodyComponent = () => {

    const [open, setOpen] = useState(false);
    const [paid, setPaid] = useState(false);
    const [recieve, setRecieve] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [discription, setDisc] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const expenses = useSelector(selectTotalExpenses);
 
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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


    const onSave = () => {
        let amountData = 0;
        if(paid) {
            amountData = Number(expenses.paid) + Number(amount);
        } else {
            amountData =  Number(expenses.recieve) +  Number(amount)
        }

        const data = {
            totalPaid: paid ? amountData : expenses.paid,
            totalRecieve: recieve ? amountData : expenses.recieve,
            list: {}
          }



          const randomId = Math.random() + "d";
          const dataObj =  {
            "transaction-type": paid ? "paid" : "recieve",
            "name":name,
            "discription": discription,
            "amount": amount,
            "date": date,
            id: randomId
        };
        
        if(data.list && data.list.hasOwnProperty(date)) {
            data.list[date].push(
                dataObj
            )
        } else {
            data.list[date] = [dataObj]
        }
        

        console.log(data)

        dispatch(updateExpenses(data))
        onCloseModal();
    }







    return(
        <div className="body">
        <ExpenseManagerComponent></ExpenseManagerComponent>
        <NoEntryComponent></NoEntryComponent>
        
        <button onClick={onOpenModal}>Open modal</button>

        <Modal open={open} onClose={onCloseModal} center>
                <div className="input">
                 <div className="label">Transaction Type</div>
                    <div className="checkbox">
                    <input type="checkbox" id="paid" name="paid" value="paid" onChange={onSetPaid} /><label for="paid"> You Paid</label>
                    </div>
                    <div className="checkbox">
                    <input type="checkbox" id="paid" name="took" value="took" onChange={onSetRecieve}  /><label for="took"> You Took</label>
                    </div>                    
                </div>   

                <div className="input">
                 <div className="label">Name</div>
                 <input type="text" id="name" name="name" value={name} onChange={(e) => onChangeNameInput(e)} />
                </div>   

                <div className="input">
                 <div className="label">Amount</div>
                 <input type="text" id="amount" name="amount" value={amount} onChange={(e) => onChangeAmountInput(e)} />
                </div>   

                <div className="input">
                 <div className="label">Discription</div>
                 <input type="text" id="disc" name="disc" value={discription} onChange={(e) => onChangeDiscInput(e)} />
                </div>   

                <div className="input">
                 <div className="label">Date</div>
                 <input type="date" id="date" name="date" value={date} onChange={(e) => onChangeDateInput(e)} />
                </div>  

                <div className="action">
                    <button onClick={onSave}>Save</button>
                    <button onClick={onCloseModal}>Cancel</button>
                </div>
        </Modal>
        </div>
    )
}