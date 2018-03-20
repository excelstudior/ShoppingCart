import React from 'react';
import Board from './Board';
import { calculateWinner } from './HelperFunction';

function Undo(props) {
    return (
        <button onClick={props.onClick}>Undo</button>
    );
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    undo() {
       // need to check if the game is finished or not
        const history = this.state.history;
        if (history.length > 1) {
            // use pop or splice
            history.pop(-1, 1);
            this.setState({
                history,
                xIsNext: !this.state.xIsNext,
            });
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = `Winner ${winner}`;
        } else {
            status = `Next player ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">

                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)} />
                </div>
                <div className="status">{status}</div>
                <div />
                <div className="game-info">
                    <div />
                    <ol />
                </div>
                <div>
                    <Undo
                        onClick={() => this.undo()} />
                </div>


            </div>
        );
    }

}

module.exports = Game;
