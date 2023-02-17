import React, { useState } from 'react';
import Button from '@mui/material/Button';
import "./Action.css";

export default function Action(props) {
    const { indexKey, resultIndex, resultArray, actionHandlers } = props;

    const actionHandlerText = (item, index, index_key) => {
        let action_list = actionHandlers.map((action, key) => {
            
            let action_arguments = action.columns.map((column) => {
                return item[column];
            })

            return (
                <Button variant="outlined" size="small" key={"action-menu-" + item[action.column] + '-' + action.name + '-' + key} onClick={() => { action.handlerFunction(...action_arguments) }} className={`action-style action-btn_${action.name.toLowerCase()}`}>
                    {action.icon}
                </Button>
            )
        })

        return (
            <>
                {action_list}
            </>
        )
    }

    return (
        <>
            {actionHandlerText(resultArray, indexKey, resultIndex)}
        </>
    )
}