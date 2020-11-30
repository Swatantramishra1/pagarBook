import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalExpenses } from "../../data/expenseManagerSlice";

export const ExpenseManagerComponent = () => {

    const expenses = useSelector(selectTotalExpenses);
    const [isOpenModal, openModal] = useState(false); 
    
    return(
        <div className="expense-manager">
            <div className="expense-manager-header">
                      Expense Manager

                      <button  >Add Entry</button>
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