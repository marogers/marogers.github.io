import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Table from './components/Table.js';
import { getBlueTable, getConfigureTable, getGreenTable, getRedTable } from './redux/selectors';
import { setConfigureTable, setRedTable, setGreenTable, setBlueTable } from './redux/actions';

const cautionText = "Invalid N, X, M: must follow rule: M = N + (X * y) where y is some positive integer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cautionNote: ''
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    if (props.configureTable !== null && props.configureTable.color !== current_state.color) {
      return {
        color: props.configureTable.color,
        n: props.configureTable.n,
        x: props.configureTable.x,
        m: props.configureTable.m,
        w: props.configureTable.w,
        d: props.configureTable.d,
        cautionNote: ''
      };
    }
    return null;
  }

  directions = {
    LTR_UP: 0,
    RTL_UP: 1
  }

  handleOk = () => {
    if (this.state.color === 'red') {
      this.props.setRedTable(this.state);
    } else if (this.state.color === 'green') {
      this.props.setGreenTable(this.state);
    } else if (this.state.color === 'blue') {
      this.props.setBlueTable(this.state);
    }
  }

  handleCancel = () => {
    this.props.setConfigureTable(null);
  }

  validate = (n, x, m) => {
    this.setState({
      cautionNote: ''
    });
    if (x <= 0 || m <= n) {
      this.setState({
        cautionNote: cautionText
      });
      return;
    }

    // Make sure n goes into m using x
    // Probably a better way of doing this...
    for (n; n < m; n = n + x) {
      // Do nothing
    }

    if (n !== m) {
      this.setState({
        cautionNote: cautionText
      });
    }
  }

  updateN = n => {
    this.validate(Number(n), Number(this.state.x), Number(this.state.m));
    this.setState({ n });
  }
  updateX = x => {
    this.validate(Number(this.state.n), Number(x), Number(this.state.m));
    this.setState({ x });
  }
  updateM = m => {
    this.validate(Number(this.state.n), Number(this.state.x), Number(m));
    this.setState({ m });
  }
  updateW = w => {
    this.setState({ w });
  }
  updateD = d => {
    this.setState({ d });
  }

  render() {
    return (
      <div className="App">
        <Table class="table-red" color={this.props.tables.red.color} n={this.props.tables.red.n} x={this.props.tables.red.x} m={this.props.tables.red.m} w={this.props.tables.red.w} d={this.props.tables.red.d}></Table>
        <Table class="table-green" color={this.props.tables.green.color} n={this.props.tables.green.n} x={this.props.tables.green.x} m={this.props.tables.green.m} w={this.props.tables.green.w} d={this.props.tables.green.d}></Table>
        <Table class="table-blue" color={this.props.tables.blue.color} n={this.props.tables.blue.n} x={this.props.tables.blue.x} m={this.props.tables.blue.m} w={this.props.tables.blue.w} d={this.props.tables.blue.d}></Table>

        { this.props.configureTable !== null
          ?
          <div className="control-panel">
            <p>Table: <span className="control-header-identifier" style={{ color: this.state.color }}>{this.state.color}</span></p>
            <div className="input-container">N = <input type="number" min="0" value={this.state.n} onChange={e => this.updateN(e.target.value)}></input></div>
            <div className="input-container">X = <input type="number" min="1" value={this.state.x} onChange={e => this.updateX(e.target.value)}></input></div>
            <div className="input-container">M = <input type="number" min="1" value={this.state.m} onChange={e => this.updateM(e.target.value)}></input></div>
            <div className="input-container">W = <input type="number" min="0" max="100" value={this.state.w} onChange={e => this.updateW(e.target.value)}></input>%</div>
            <div className="input-container">D = <select name="direction" value={this.state.d} onChange={e => this.updateD(e.target.value)}>
                <option value="0">LTR-UP</option>
                <option value="1">RTL-UP</option>
              </select>
            </div>
            <div className="input-container">
              <button type="button" className="control-button" onClick={this.handleOk} disabled={this.state.cautionNote.length > 0} style={{ marginRight: '5px' }}>OK</button>
              <button type="button" className="control-button" onClick={this.handleCancel}>CANCEL</button>
            </div>
            <div className="input-container" style={{color: 'darkorange'}}>{this.state.cautionNote}</div>
          </div>
          :
          null
        }
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  const configureTable = getConfigureTable(state);
  const tables = {
    red: getRedTable(state),
    green: getGreenTable(state),
    blue: getBlueTable(state)
  }
  return { configureTable, tables };
};

export default connect(MapStateToProps, { setConfigureTable, setRedTable, setGreenTable, setBlueTable })(App);
