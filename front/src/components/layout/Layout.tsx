import React from 'react';
import { IStackStyles, Stack } from '@fluentui/react/lib/Stack';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import LayoutCommandBar from './LayoutCommandBar';
import { MapStateToProps, connect } from 'react-redux';
import { RootAppState } from 'store';
import { StringUtil } from 'commonUtil';
import * as Paths from 'constant/Paths';
import { Status404Page } from 'module/statusPage';
import NavigationMenu from './NavigationMenu';
const ContactsPage = React.lazy(() => import('module/contacts/ContactsPage'));
const FilesPage = React.lazy(() => import('module/files/FilesPage'));
const ClientsPage = React.lazy(() => import('module/clients/ClientsPage'));

interface StateProps {
  authenticate: boolean;
  navVisible: boolean;
}

type Props = StateProps & RouteComponentProps;

const contentStackStyles: IStackStyles = {
  root: {
    minHeight: '400px',
    paddingLeft: '0px',
    paddingRight: '0px',
    boxSizing: 'border-box',
    maxWidth: '1600px'
  }
};

const containerStackStyles: IStackStyles = {
  root: {
    minHeight: '800px'
  }
};

class Layout extends React.Component<Props> {
  static mapStateToProps: MapStateToProps<StateProps, {}, RootAppState> = ({ nav, app }) => ({
    authenticate: !StringUtil.isEmpty(app.token) && !StringUtil.isEmpty(app.username),
    navVisible: nav.visible
  });

  componentDidMount() {
    if (this.props.authenticate === false) {
      this.props.history.push(Paths.Login);
    }
  }

  render() {
    const { navVisible } = this.props;
    return (
      <>
        <Stack verticalFill styles={containerStackStyles}>
          <LayoutCommandBar />
          <Stack horizontal verticalFill>
            {navVisible && <NavigationMenu />}
            <Stack grow verticalFill styles={contentStackStyles}>
              <Stack.Item grow verticalFill>
                <React.Suspense fallback={null}>
                  <Switch>
                    <Route
                      path="/"
                      exact
                      component={(): JSX.Element | null => {
                        return null;
                      }}
                    />
                    <Route path={Paths.Contacts} component={ContactsPage} />
                    <Route path={Paths.Clients} component={ClientsPage} />
                    <Route path={Paths.Files} component={FilesPage} />
                    <Route component={Status404Page} />
                  </Switch>
                </React.Suspense>
              </Stack.Item>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }
}

export default withRouter(connect<StateProps, {}, {}, RootAppState>(Layout.mapStateToProps, {})(Layout));
