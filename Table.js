import React, { useState, useEffect } from 'react';
import "./Table.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Pagination from '../common/Pagination';
import TableRows from './TableRows';

export default function Table(props) {

    const [results, setResults] = useState([]);
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const limit = 7;

    const { columns, indexes, sortingColumns, actionHandlers, updateStatus , dataGatewayURI, processId, setProcessID } = props;

    const sortingOrderingHandler = (sort_type, order_type) => {
        setSort(sort_type);
        setOrder(order_type);
    }
  
    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = {
            "_sort" : sort,
            "_order" : order,
            "_limit" : limit,
            "_page" : (page-1)
        }

        var requestOptions = {
            headers: myHeaders,
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data)
        };

        const getData = async () => {
            await fetch(dataGatewayURI, requestOptions).then((response) => {                
                return response.json()
            }).then((result) => {
                if(result['content']) {
                    setTotalEntries(result.totalElements);
                    setResults(result['content']);
                    setProcessID(0);
                }
            })
        }

        if (dataGatewayURI)
            getData();
    }, [sort, order, page, dataGatewayURI, processId, setProcessID])

    const tableColumns = columns.map((column, index) => {
        if (sortingColumns.indexOf(column.column_index) > -1) {
            if (sort === column.column_index) {
                if (order === 'desc') {
                    return (
                        <th key={"column_" + index + column.column_index} className="th_link sort" onClick={() => sortingOrderingHandler(column.column_index, 'asc')}>{column.name} <KeyboardArrowDownIcon /></th>
                    )
                } else {
                    return (
                        <th key={"column_" + index + column.column_index} className="th_link sort" onClick={() => sortingOrderingHandler(column.column_index, 'desc')}>{column.name} <KeyboardArrowUpIcon /></th>
                    )
                }
            } else {
                return (
                    <th key={"column_" + index + column.column_index} className="th_link" onClick={() => sortingOrderingHandler(column.column_index, 'asc')}>{column.name}</th>
                )
            }
        } else {
            return (
                <th key={"column_" + index + column.column_index} className=''>{column.name}</th>
            )
        }
    });

    return (
        <>
        <div className='table-responsive'>
            <table className='table table-theme'>
                <thead>
                    <tr>
                        {tableColumns}
                    </tr>
                </thead>
                <tbody>
                    {results.length ?
                        <TableRows results={results} indexes={indexes} updateStatus={updateStatus} actionHandlers={actionHandlers}/>
                        :
                        <>
                            <tr>
                                <td colSpan={columns.length} align='center'>No Results Found!</td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
        <Pagination setPageHandler={setPage} currentPage={page} totalEntries={totalEntries} entriesPerPage={limit} />
        </>
    )
}