import React from 'react'
import Switch from '@mui/material/Switch';

export default function TableRowStatusColumn({ index, index_key, result_index, result_array, updateStatus}) {

    const checked = result_array[index] === "ACTIVE" ? true : false;

    return (
        <td className='status' key={index_key + "_" + result_index}>
            <Switch role='checkbox' aria-checked={checked} defaultChecked={checked} onChange={() => updateStatus.handlerFunction(result_array['id'], result_array[index])} />
        </td>
    )
}
