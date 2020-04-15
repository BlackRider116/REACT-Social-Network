import React from "react";
import styles from "./Pagination.module.scss";

let pages = [];
let maxPortionPages

export const filterPagesNumbers = (
  totalCount,
  usersCount,
  portionNumber = 1,
  portionSize = 10
) => {
  if (pages.length === 0) {
    const pagesCount = Math.ceil(totalCount / usersCount);
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    maxPortionPages = Math.ceil(pagesCount / portionSize);
  }

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return pages.filter(
    p => p >= leftPortionPageNumber && p <= rightPortionPageNumber
  );
};

const Pagination = ({
  numberPage,
  onNumberPage,
  pagesNumbers,
  portionPagesNumbers,
  onPagesNumbers
}) => {

  const jumpNext = () => {
    onPagesNumbers(portionPagesNumbers + 1);
  };
  const jumpPrev = () => {
    onPagesNumbers(portionPagesNumbers - 1);
  };

  const leftPortionPageNumber = pagesNumbers[0];
  const rightPortionPageNumber = pagesNumbers[pagesNumbers.length - 1];

  const next = () => {
    if (numberPage < leftPortionPageNumber) {
      onNumberPage(leftPortionPageNumber, portionPagesNumbers);
    } else if (numberPage >= rightPortionPageNumber) {
      onNumberPage(rightPortionPageNumber + 1, portionPagesNumbers + 1);
    } else {
      onNumberPage(numberPage + 1, portionPagesNumbers);
    }
  };

  const prev = () => {
    if (numberPage > rightPortionPageNumber) {
      onNumberPage(rightPortionPageNumber, portionPagesNumbers);
    } else if (numberPage <= leftPortionPageNumber) {
      onNumberPage(leftPortionPageNumber - 1, portionPagesNumbers - 1);
    } else {
      onNumberPage(numberPage - 1, portionPagesNumbers);
    }
  };

  return (
    <>
      <div className={styles.pagination}>
        {
          <button
            className={
              portionPagesNumbers > 1 ? styles.jump : styles.displayNone
            }
            onClick={jumpPrev}
          >
            JUMP PREV
          </button>
        }
        {
          <button
            className={numberPage !== 1 ? styles.jump : styles.displayNone}
            onClick={prev}
          >
            PREV
          </button>
        }
        {pagesNumbers.map(p => {
          return (
            <button
              className={
                numberPage === p ? styles.pageNumber : styles.buttonsColor
              }
              key={p}
              onClick={() => {
                onNumberPage(p, portionPagesNumbers);
              }}
            >{` ${p}`}</button>
          );
        })}
        {
          <button
            className={
              pages.length > numberPage ? styles.jump : styles.displayNone
            }
            onClick={next}
          >
            NEXT
          </button>
        }
        {
          <button
            className={
              maxPortionPages > portionPagesNumbers ? styles.jump : styles.displayNone
            }
            onClick={jumpNext}
          >
            JUMP NEXT
          </button>
        }
      </div>
    </>
  );
};

export default Pagination;
