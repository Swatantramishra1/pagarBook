import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalExpenses, updateModalStatus } from "../../data/expenseManagerSlice";

export const ExpenseManagerComponent = () => {

    const expenses = useSelector(selectTotalExpenses);
    const dispatch = useDispatch();
    const [isOpenModal,setOpenModal] = useState(false);

    const onHandleAddEntryButton = () => {
        setOpenModal(!setOpenModal);
        dispatch(updateModalStatus(!isOpenModal))
    }
    
    
    return(
        <div className="expense-manager">
            <div className="expense-manager-header">
                      Expense Manager

                      <button onClick={onHandleAddEntryButton} className="btnAddEntry">Add Entry</button>
            </div>
            <div className="expense-manager-welcome-text">
                Welcome! Manage Your Transactions Here
            </div>
            <div className="expense-manager-balance-info">
                <div className="expense-manager-balance-info-recieve">
                <div className="recieved-text">₹ {expenses.recieve}</div>
                <div className="text-info">Total Received</div>

                </div>

                <div className="expense-manager-balance-info-paid">
                <div className="paid-text">(-) ₹ {expenses.paid}</div>
                <div  className="text-info">Total Paid</div>
                </div>
            </div>

            {/* <ModalComponent isOpen="isOpenModal"></ModalComponent> */}
          
        </div>
    )
}