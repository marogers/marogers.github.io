import React from 'react';
import { connect } from 'react-redux';
import { setConfigureTable } from '../redux/actions';

// Assumptions
// 1) number of columns is locked at 5
// 2) maximum will always match on the increment (e.g. if n = 0, x = 5, m != 9)
// 3) only positive numbers allowed
// 4) m > n
// 5) x > 0

class Table extends React.Component {

    directions = {
        LTR_UP: 0,
        RTL_UP: 1
    }

    handleConfigure = () => {
        this.props.setConfigureTable(
            {
                color: this.props.color,
                n: this.props.n,
                x: this.props.x,
                m: this.props.m,
                w: this.props.w,
                d: this.props.d
            }
        );
    }

    buildTable = (n, x, m, d) => {
        // Figure out how many cells we'll need containing numbers
        let temp = n
        let cells = 1;
        while (temp < m) {
            cells++;
            temp = temp + x;
        }

        // Figure out how many grey cells needed to fill out the table
        let numGreyCells = 5 - (cells % 5);
        numGreyCells = numGreyCells === 5 ? 0 : numGreyCells; // Discovered a situation where I was adding a whole row of only grey cells so this fixes that
        let rows = (cells + numGreyCells) / 5; // Number of rows we'll need in the table
        let startTop = 'left';
        // Figure out which corner we'll need to start in at the top
        if (d == this.directions.LTR_UP) { // === didn't work here consistently...
            // If total cells divided by 5 is an even number then we start from the top left (woo!)
            if (rows > 1 && (rows % 2) === 0) {
                startTop = 'left';
            } else {
                startTop = 'right';
            }
        } else {
            // The reverse of the above logic..
            if (rows > 1 && (rows % 2) === 0) {
                startTop = 'right';
            } else {
                startTop = 'left';
            }
        }

        let tableBody = []; // HTML table body
        let currentDirection = 'LTR'; // Using a bit (0/1) to represent this would make some code shorter but letters help with readability
        if (startTop === 'right') {
            currentDirection = 'RTL';
        }

        let greyCellsLeft = numGreyCells;
        let currentNumber = m; // Start at maximum and subtract x each iteration
        let currentHtmlRow = []; // HTML row for storing columns
        let cellKey = 0; // Some unique key to make react happy

        // Each iteration of the loop should add an entire row to our table
        while (currentNumber >= n) {
            currentHtmlRow = [];

            if (currentDirection === 'LTR') {
                for (let i = 0; i < 5; i++) {
                    if (greyCellsLeft > 0) { // If we have grey cells to push, then add those first
                        currentHtmlRow.push(<td className="grey" key={cellKey}></td>);
                        cellKey++;
                        greyCellsLeft = greyCellsLeft - 1;
                    } else { // ... otherwise add the next number
                        currentHtmlRow.push(<td key={cellKey}>{currentNumber}</td>);
                        cellKey++;
                        currentNumber = currentNumber - x;
                    }
                }
            } else { // currentDirection === 'RTL'
                for (let i = 4; i >= 0; i--) {
                    if (greyCellsLeft > 0) { // If we have grey cells to push, then add those first
                        currentHtmlRow.push(<td className="grey" key={cellKey}></td>);
                        cellKey++;
                        greyCellsLeft--;
                    } else { // ... otherwise add the next number
                        currentHtmlRow.push(<td key={cellKey}>{currentNumber}</td>);
                        cellKey++;
                        currentNumber = currentNumber - x;
                    }
                }
            }

            // Reverse direction
            if (currentDirection === 'LTR') {
                tableBody.push(<tr key={cellKey}>{currentHtmlRow}</tr>);
                cellKey++;
                currentDirection = 'RTL';
            } else {
                tableBody.push(<tr key={cellKey}>{currentHtmlRow.reverse()}</tr>);
                cellKey++;
                currentDirection = 'LTR';
            }
        }

        return tableBody;
    }

    render() {
        const tableBody = this.buildTable(Number(this.props.n), Number(this.props.x), Number(this.props.m), Number(this.props.d));
        return (
            <div className="table-container" id={'table-' + this.props.color} style={{ border: '2px solid ' + this.props.color, width: this.props.w + '%' }}>
                <table>
                    <tbody>{tableBody}</tbody>
                </table>
                <div className="under-table-container">
                    <div className="configure-button-container">
                        <button type="button" className="configure-button" onClick={this.handleConfigure}>Configure</button>
                    </div>
                    <div className="width-span-container">
                        <span className="table-width-span">{this.props.w}%</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { setConfigureTable })(Table);