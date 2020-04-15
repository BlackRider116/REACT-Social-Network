import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({totalCount, usersCount, numberPage, onNumberPage, portionSize = 10}) => {

  let pagesCount = Math.ceil(totalCount / usersCount);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  const next = () => {
    if(numberPage < leftPortionPageNumber){
      onNumberPage(leftPortionPageNumber)
    }
    else if(numberPage >= rightPortionPageNumber){
      onNumberPage(rightPortionPageNumber+1)
      setPortionNumber(portionNumber+1)
    }
    else {
      onNumberPage(numberPage+1)
    }
  }

  const prev = () => {
    if(numberPage > rightPortionPageNumber){
      onNumberPage(rightPortionPageNumber)
    }
    else if(numberPage <= leftPortionPageNumber){
      onNumberPage(leftPortionPageNumber-1)
      setPortionNumber(portionNumber-1)
    }
    else {
      onNumberPage(numberPage-1)
    }
  }

  return (
    <>
   { totalCount !== 0 ? 
    <div className={styles.pagination}>
      {<button className={portionNumber > 1 ? styles.jump : styles.displayNone } onClick={() => {setPortionNumber(portionNumber-1)}}>JUMP</button>}
      {<button className={numberPage !== 1 ? styles.jump :  styles.displayNone } onClick={() => {prev()}}>PREV</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <button className={numberPage === p ? styles.pageNumber : styles.buttonsColor}
              key={p} 
              onClick={() => {
                onNumberPage(p);
              }}
            >{` ${p}`}</button>
          );
        })}
      {<button className={pages.length !== numberPage ? styles.jump : styles.displayNone } onClick={() => {next()}}>NEXT</button>}
      {<button className={portionCount > portionNumber ? styles.jump : styles.displayNone } onClick={() => {setPortionNumber(portionNumber+1)}}>JUMP</button>}
      </div>
     : null }
    </>
  );
};

export default Pagination;
