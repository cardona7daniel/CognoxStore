import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';


function document() {
  return (
    <div>
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

export default document;
