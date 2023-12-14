"use client";
import { useState } from "react";
import { useGetCompanyQuery } from "@/redux/features/companySlice";
import Pagination from "@/src/components/pagination/pagination";
import Image from "next/image";

const Table = () => {
  const [apiParams, setApiParams] = useState({
    company_status: 1,
    company_name: "",
    page: 1,
  });
  const { data, isLoading, isError, error } = useGetCompanyQuery(apiParams);
  const handleSearch = (e) => {
    setApiParams({ ...apiParams, company_name: e.target.value });
  };
  const handleFilter = (e) => {
    setApiParams({ ...apiParams, company_status: e.target.value });
  };
  const handlePagination = (page) => {
    setApiParams({ ...apiParams, page: page.selected + 1 });
  };
  let renderPagination = "";
  if (data?.companys?.total > 1) {
    renderPagination = (
      <Pagination
        pageCount={data?.companys?.total}
        handlePageClick={handlePagination}
        pageFirstShow={data?.companys?.current_page}
      />
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <select
            value={apiParams.company_status}
            onChange={(e) => handleFilter(e)}
            className="form-select "
            name="comapany_status"
            id="company_stauts"
          >
            <option value="1">Active</option>
            <option value="0">Deactivate</option>
          </select>
        </div>
        <div>
          <input
            placeholder={"Search by company name"}
            value={apiParams.company_name}
            type="search"
            onChange={(e) => handleSearch(e)}
            className="form-control"
          />
        </div>
      </div>
      <table className="table table-bordered table-striped ">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Company Phone</th>
            <th>Company Address</th>
            <th>Company Status</th>
            <th>Company Logo</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center" colSpan={5}>
                Loading...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={5}>Error: {error.message}</td>
            </tr>
          ) : data?.companys?.data.length > 0 ? (
            data?.companys?.data.map((company) => (
              <tr key={company.id}>
                <td>{company.company_name}</td>
                <td>{company.company_phone}</td>
                <td>
                  <p>{company.address1}</p>
                  <p>{company.address2}</p>
                  <p>{company.city}</p>
                </td>
                <td>
                  {company.company_status === "1" ? "Active" : "Deactivate"}
                </td>
                <td>
                  <div className="image_wrapper">
                    {company?.company_logo_link ? (
                      <img
                        loading="lazy"
                        src={company.company_logo_link}
                        alt={company.company_name}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <img
                        loading="lazy"
                        alt={company.company_name}
                        width={100}
                        height={100}
                        src="/no_image.png"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan={5}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">{renderPagination}</div>
    </div>
  );
};

export default Table;
