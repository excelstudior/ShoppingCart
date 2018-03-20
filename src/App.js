import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Game from './Game';


class App extends Component {
    state = { loading: false };

    componentDidMount() {
        // 测试 devServer 的代理功能
        // fetch('/api/category')
        //     .then(resp => resp.json())
        //     .then(res => console.log('here here', res));
    }

    render() {
        return (
            <div className="App">
                {/* <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p>{ this.state.loading.toString() }</p> */}
                <Game />
            </div>
        );
    }
}

export default App;
