const { useSelector } = require("react-redux");
const {  selectListData } = require("../../data/expenseManagerSlice");

export const ListComponent = () => {

    const selectList = useSelector(selectListData);

    const getTotal = (key, state) => {
        const total = selectList[key].reduce((acc, curr) => {
            if(state == curr["transaction-type"]) {
                return acc + Number(curr.amount);
            } else {
                return 0;
            }
        }, 0)
    };



    const characteristics = Object.keys(selectList).map((key, i) => {
        return (
            <div className="box" key={i+"box"}>
                <div className="box-data">
                <span>
                {key}
                </span>
                  
                </div>
                
           {selectList[key].map((item,index) =>  {
               return <div className="box-item" key={index+"item"}>
                        <span> {item.name} </span>
                        <span>{item.discription}</span>
                        <span>{item.amount}</span>
                        <span>{item["transaction-type"]}</span>
                           
                </div>
           })}
        </div>
        );
      });


    
 
    return (
        <div className="listContainer">
                {characteristics}
        </div>
    )
}