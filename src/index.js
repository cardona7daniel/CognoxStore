//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';

//Pages
import 'antd/dist/antd.css';
import esEs from 'antd/lib/locale-provider/es_ES';
// import registerServiceWorker from './registerServiceWorker';
import Document from './Pages/_document';
import store from './State/store';

const history = syncHistoryWithStore(createBrowserHistory(), store);
const baseName = process.env.REACT_APP_URL_BASE;

function App() {
    return (
      <LocaleProvider locale={esEs}>
        <Provider store={store}>
          <Router history={history} basename={baseName}>
            <Document />
          </Router>
        </Provider>
      </LocaleProvider>
    );
  }

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
