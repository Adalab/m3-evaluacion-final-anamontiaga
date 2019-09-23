import React from "react";
import "./stylesheets/App.scss";
import { fetchCharacters } from "./services/fetchCharacters";
import logo from "./images/logo.png";
import Home from "./components/Home";
import CharacterDetail from "./components/CharacterDetail";
import { Switch, Route } from "react-router-dom";
import "./stylesheets/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      query: ""
    };
    this.getCharacterQuery = this.getCharacterQuery.bind(this);
    // this.getCharacterStatus = this.getCharacterStatus.bind(this);
  }
  componentDidMount() {
    this.getCharacters();
  }

  getCharacters() {
    fetchCharacters().then(data => {
      this.setState({ characters: data.results });
    });
  }

  getCharacterQuery(ev) {
    const query = ev.currentTarget.value;
    this.setState({ query: query });
  }

  // getCharacterStatus() {
  //   const status = characters.filter(item => item.status === "Alive");

  //   this.setState({
  //     [status]: "hello"
  //   });
  // }

  render() {
    const { characters, query } = this.state;
    return (
      <div className="app">
        <div className="app__logo">
          <img src={logo} alt="Welcome to Rick and Morty world" className="app_logo--img" />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home getCharacterQuery={this.getCharacterQuery} characters={characters} query={query} value={query} />;
            }}
          />
          <Route
            path="/character/:id"
            render={routerProps => {
              return <CharacterDetail routerProps={routerProps} characters={characters} state={this.state} getCharacterStatus={this.getCharacterStatus} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
