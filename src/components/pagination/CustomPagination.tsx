import "./CustomPagination.css";
import classNames from "classnames";

interface PaginationProps{
  currentPage:number
  total:number
  limit:number
  onPageChange:any
}

const range = (start:number, end:number) => {
    const arr:number[] = []
    for(let i = 0; i<end-start; i++)
        arr.push(i+1)

    return arr
};

const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }:any) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);


  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  } else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
};

const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }:any) => {
  const liClasses = classNames({
    "page-item": true,
    active: page === currentPage,
    disabled: isDisabled,
  });
  return (
    <li className={liClasses} onClick={() => onPageChange(page)}>
      <span className="page-link">{page}</span>
    </li>
  );
};

const CustomPagination = ({ currentPage, total, limit, onPageChange }:PaginationProps) => {
  const pagesCount = Math.ceil(total / limit);
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;
  return (
    <ul className="pagination">
      <PaginationItem
        page="First"
        currentPage={currentPage}
        onPageChange={() => onPageChange(1)}
        isDisabled={isFirstPage}
      />
      <PaginationItem
        page="Prev"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage - 1)}
        isDisabled={isFirstPage}
      />
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <PaginationItem
        page="Next"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage + 1)}
        isDisabled={isLastPage}
      />
      <PaginationItem
        page="Last"
        currentPage={currentPage}
        onPageChange={() => onPageChange(pages.length)}
        isDisabled={isLastPage}
      />
    </ul>
  );
};
export default CustomPagination;