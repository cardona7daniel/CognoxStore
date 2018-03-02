import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';
import Login from './login';
import Layout from './layout';


class document extends Component {
  state = {
    isLogged: false,
    dataUser: null,
  };

  onLogged = (dataUser) => {
    this.setState({
      isLogged: true,
      dataUser,
    });
  }

  offLogged = () => {
    this.setState({
      isLogged: false,
    });
  }

  render() {
    const { isLogged, dataUser } = this.state;
    if (!isLogged) {
      return (
        <Login
          onLogged={this.onLogged}
        />
      );
    }
    return (
      <div>
        <Layout user={dataUser} offLogged={this.offLogged} />
        <Switch>
          {routes.map(route => (
            <Route
              key={route.index}
              exact={route.exact ? route.exact : false}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default document;
