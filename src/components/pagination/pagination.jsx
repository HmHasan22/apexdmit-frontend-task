import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const Pagination = (props) => {
  const [activePage, setActivePage] = useState(0);
  useEffect(() => {
    setActivePage(props.pageFirstShow - 1);
  }, [props.pageFirstShow]);
  return (
    <div className={`pagination-wrapper`}>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        marginPagesDisplayed={1}
        activeClassName="active"
        pageCount={props.pageCount}
        pageRangeDisplayed={2}
        containerClassName="pagination"
        // pageRangeDisplayed={1}
        onPageChange={props.handlePageClick}
        forcePage={activePage}
        {...props}
      />
    </div>
  );
};

export default Pagination;
