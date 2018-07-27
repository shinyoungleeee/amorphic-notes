import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public componentDidMount() {
    fetch('/api/v1/notes/create', {
      body: JSON.stringify({ body: 'note made from React' }),
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: 'POST'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data.body);
    }).catch(error => console.error(error));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
