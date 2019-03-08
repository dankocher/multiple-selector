import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import MultipleSelector from "./components/MultipleSelector";


const elements = [
    {
        key: "1",
        value: "Item 1"
    },
    {
        key: "2",
        value: "Item 2"
    },
    {
        key: "3",
        value: "Item 3"
    },
    {
        key: "4",
        value: "Item 4"
    },
    {
        key: "5",
        value: "Item 5"
    }
];

class App extends Component {

    onChangeMultipleSelector(data) {
        console.log(data)
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div style={{width: 400, height: 400, padding: 5, backgroundColor: 'white'}}>
                <MultipleSelector
                    data={elements}
                    selected={["1", "2"]}
                    onChange={this.onChangeMultipleSelector}
                    selectText={'Add Item'}
                    deleteText={'Delete Item'}
                    size='default'
                />
            </div>
        </header>
      </div>
    );
  }
}

export default App;
