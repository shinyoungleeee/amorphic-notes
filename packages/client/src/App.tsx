import * as React from 'react';
import AmorphicDeserializer from './deserialize/AmorphicDeserializer';

import './App.css';

import logo from './logo.svg';

export default class App extends React.Component {


  public componentDidMount() {
    fetch('/api/v1/notes/5b5f141fd8ee5f364804a31e')
    // fetch('/api/v1/notes', {
    //   body: JSON.stringify({ body: 'a new note from React' }),
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //   },
    //   method: 'POST'
    // })
      .then(res => res.json())
      .then(data => {
        const obj = AmorphicDeserializer.deserialize(data, {});
        console.log(obj);
      })
      .catch(error => console.error(error));
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
