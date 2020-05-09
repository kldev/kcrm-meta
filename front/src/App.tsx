import React from 'react';
import { Fabric } from '@fluentui/react/lib/Fabric';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Paths from 'constant/Paths';
import { NotifyMessageBarProvider } from 'components/provider';

const LoginPage = React.lazy(() => import('module/login/LoginPage'));
const Layout = React.lazy(() => import('components/layout/Layout'));

interface StateProps {}

class App extends React.Component {
  render() {
    /* Todo create layout after login. move routes theres */
    /* Todo create layout for errors. move routes theres */

    return (
      <Router>
        <Fabric id="app">
          <NotifyMessageBarProvider>
            <React.Suspense fallback={null}>
              <Switch>
                <Route path={Paths.Login} component={LoginPage} />
                <Route path={Paths.Home} component={Layout} />
                {/* <Route component={Page404} /> */}
              </Switch>
            </React.Suspense>
          </NotifyMessageBarProvider>
        </Fabric>
      </Router>
    );
  }
}
export default App;
