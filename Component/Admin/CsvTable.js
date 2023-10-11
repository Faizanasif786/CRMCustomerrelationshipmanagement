// CsvTable.js
import React from 'react';


const CsvTable = ({ data }) => {
  const headers = Object.keys(data[0]);

  return (
    <>

    <table className="csv-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default CsvTable;
    