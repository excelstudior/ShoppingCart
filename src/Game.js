import React from 'react';
import Board from './Board';
import { calculateWinner, isNullElement } from './HelperFunction';
import { Undo, Restart } from './Undo';


class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            btnUndo: false,
            btnRestart: false,
            winner: null,
            isNullElement: true,
        };
    }

    restart() {
        this.setState({
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            btnUndo: false,
            btnRestart: false,
            winner: null,
            isNullElement: true,
        });
    }

    undo() {
       // need to check if the game is finished or not
        const history = this.state.history;
        if (history.length > 2) {
            // use pop or splice
            history.pop(-1, 1);
            this.setState({
                history,
                xIsNext: !this.state.xIsNext,
            });
        } else if (history.length === 2) {
            history.pop(-1, 1);
            this.setState({
                history,
                xIsNext: !this.state.xIsNext,
                btnUndo: false,
                btnRestart: false,
            });
        }
    }


    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const gotWinner = calculateWinner(squares);
        if (gotWinner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';


        this.setState({
            history: history.concat([{
                squares,
            }]),
            xIsNext: !this.state.xIsNext,
            btnUndo: true,
            btnRestart: true,
        });

        const updatedHistory = history.concat([{ squares }]);
        const updatedCurrent = updatedHistory[updatedHistory.length - 1];
        const updatedSquare = updatedCurrent.squares.slice();
        const checkNullElement = isNullElement(updatedSquare);
        const calculateWinnerAgain = calculateWinner(updatedSquare);
        if (calculateWinnerAgain) {
            this.setState({
                btnUndo: false,
                winner: calculateWinnerAgain,
            });
        } else if (!checkNullElement) {
            this.setState({
                btnUndo: false,
                isNullElement: false,
            });
        }
    }


    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.state.winner;
        const btnUndo = this.state.btnUndo;
        const btnRestart = this.state.btnRestart;
        const checkNullElement = this.state.isNullElement;
        let status;
        if (winner) {
            status = `Winner ${winner}`;
        } else if (!checkNullElement) {
            status = 'it is a draw';
        } else {
            status = `Next player ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const Hcomponent = props => (<div><h1>Hello </h1>
            {props.children}</div>);

        const FakeLine = props => (<h3>{props.name}</h3>);
        // <FakeLine name={testVariable} />

        const testVariable = 'test';
        return (
            <div className="game">
                <Hcomponent>
                    <FakeLine name="Superman" />
                    <h4>{testVariable}</h4>
                </Hcomponent>
                <div className="status">{status}
                    <div>

                        {btnUndo && <Undo onClick={() => this.undo()} />}
                        {btnRestart && <Restart onClick={() => this.restart()} />}
                    </div>
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)} />
                </div>

                <div />
                <div className="game-info">
                    <div />
                    <ol />
                </div>


            </div>
        );
    }

}

module.exports = Game;
