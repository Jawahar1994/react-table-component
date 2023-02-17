import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function TableRowCopyColumn({ text }) {

    const [showCopyIcon, setShowCopyIcon] = useState(false);

    return (
        <td className='copy-column' onMouseEnter={() => setShowCopyIcon(true)} onMouseLeave={() => setShowCopyIcon(false)}>
            {text.slice(0, 20) + "..."}
            {showCopyIcon === true && <ContentCopyIcon className='copy-icon' onClick={ () => navigator.clipboard.writeText(text)}/>}            
        </td>
    )
}
