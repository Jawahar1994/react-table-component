import React from 'react'
import ActionMenu from "./Action";
import TableRowCopyColumn from './TableRowCopyColumn';
import TableRowStatusColumn from './TableRowStatusColumn';

export default function TableRows({ results, indexes, updateStatus, actionHandlers }) {

    const copyIconColumn = ["secret", "appId", "correlationId"];

    const resultsText = results.map((result_array, result_index) => {
        return (
            <tr key={"row_" + result_index}>
                {
                    indexes.map((index, index_key) => {
                        if (typeof result_array[index] !== "undefined") {
                            if (index === 'status') {
                                return <TableRowStatusColumn key={index_key + "_" + result_index} index={index} index_key={index_key} result_index={result_index} result_array={result_array} updateStatus={updateStatus} />

                            } else {
                                if (copyIconColumn.includes(index) === true) {
                                    return <TableRowCopyColumn key={index_key + "_" + result_index} text={result_array[index]} />
                                } else {
                                    return (
                                        <td key={index_key + "_" + result_index}>{result_array[index]}</td>
                                    )
                                }
                            }
                        } else if (index === "Action") {
                            return (
                                <td className='action' key={index_key + "_" + result_index}>
                                    <ActionMenu indexKey={index_key} resultIndex={result_index} resultArray={result_array} actionHandlers={actionHandlers} />
                                </td>

                            )
                        }
                    })
                }
            </tr>
        )
    })

    return (
        <>
            {resultsText}
        </>
    )
}
