import React from 'react';
import Pagination from '../Pagination.tsx';

// Column tipi
type Column<T> = {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
};

// Props tipi
type CustomTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

function CustomTable<T>({ columns, data }: CustomTableProps<T>) {
  return (
    <div className="dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*<Pagination />*/}
    </div>
  );
}

export default CustomTable;
