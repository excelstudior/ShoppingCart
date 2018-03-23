import React from 'react';

export function Undo(props) {
    return (
        <button id="btnUndo" onClick={props.onClick}>Undo</button>
    );
}


export function Restart(props) {
    return (
        <button id="btnRestart" onClick={props.onClick}>Restart</button>
    );
}
