/* eslint-disable no-alert */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { downloadCards } from '../actions';


function generateCell(x, y, content) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="200"
        height="200"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
      />
      <text
        x={x + 100}
        y={y + 100}
        fontSize="32"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {content}
      </text>
    </g>);
}

function generateCard(w, h) {
  const cells = [];
  const totalCells = w * h;
  const freeSpace = Math.round(totalCells / 2);

  let cell = 0;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      cell++;
      const x = ((j + 1) * 200);
      const y = 200 * (i + 1);
      const content = cell === freeSpace ? 'free' : Math.floor(Math.random() * 100);
      cells.push(generateCell(x, y, content));
    }
  }
  return <svg id="preview" viewBox="0 0 1400 1400">{cells}</svg>;
}
class Bingo extends Component {
  constructor() {
    super();
    this.grid = 5;
  }

  handleClick(e) {
    e.preventDefault();
    this.props.downloadCards();
  }
  render() {
    return (
      <section>
        {generateCard(this.grid, this.grid)}
        <button onClick={this.handleClick}>Generate Cards</button>
      </section>
    );
  }
}

export default connect(null, { downloadCards })(Bingo);
