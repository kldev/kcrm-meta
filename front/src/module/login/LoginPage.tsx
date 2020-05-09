import './LoginPage.scss';

import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Image } from '@fluentui/react/lib/Image';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Dashboard } from 'constant/Paths';

import { loginStackStyles, logoStyles } from './LoginPageConst';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as Env from 'constant/Env';

import logo from 'assets/loginScreen.png';
import { loginStatusType } from 'store/login/types';
import { loginUserAsync as loginUser, loginUserAsyncType, setStatus, setError } from 'store/login';
import { connect, MapStateToProps } from 'react-redux';
import { RootAppState } from 'store';
import { LoginRequest, LoginResponse } from 'api/model';
import { ThunkDispatch } from 'redux-thunk';
import { StringUtil } from 'commonUtil';

interface DispatchProps {
  setStatus: (status: loginStatusType) => void;
  setErrorMessage: (message: string) => void;
  loginUser: loginUserAsyncType;
}

interface StateProps {
  status: loginStatusType;
  errorMessage: string;
}

type Props = DispatchProps & StateProps & RouteComponentProps;

interface State {
  username: string;
  password: string;
}

class LoginPage extends React.Component<Props, State> {
  static mapDispatchToProps = (dispatch: ThunkDispatch<RootAppState, void, any>): DispatchProps => ({
    loginUser: (req) => {
      return (dispatch(loginUser(req)) as unknown) as Promise<LoginResponse | null>;
    },
    setErrorMessage: (message) => dispatch(setError(message)),
    setStatus: (status) => dispatch(setStatus(status))
  });

  static mapStateToProps: MapStateToProps<StateProps, {}, RootAppState> = ({ login }) => ({
    status: login.status,
    errorMessage: login.errorMessage
  });

  public constructor(props: Props) {
    super(props);

    this.state = {
      username: Env.Username,
      password: Env.Password
    };
  }

  componentDidMount() {
    this.props.setStatus('idle');
  }

  onLogin = async () => {
    const { username, password } = this.state;

    let result = await this.props.loginUser({ username, password } as LoginRequest);

    if (result && StringUtil.isEmpty(result.token) === false) {
      this.props.history.push(Dashboard);
    }
  };

  renderErrorMessageBar() {
    const { errorMessage } = this.props;
    if (!errorMessage) return null;

    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        onDismiss={() => this.props.setErrorMessage('')}
        dismissButtonAriaLabel="Close"
      >
        {errorMessage}
      </MessageBar>
    );
  }

  render() {
    const { status } = this.props;
    return (
      <Stack verticalFill verticalAlign="start" horizontalAlign="center">
        <Stack styles={loginStackStyles}>
          <Image src={logo} styles={logoStyles} />
          <TextField
            label="Username"
            placeholder="Enter your login"
            value={this.state.username}
            onChange={(e, newValue) => this.setState({ username: newValue as string })}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={this.state.password}
            onChange={(e, newValue) => this.setState({ password: newValue as string })}
          />

          <Stack tokens={{ padding: 20 }}>
            {status !== 'in-progress' && (
              <PrimaryButton
                data-automation-id="test"
                text="Log in!"
                allowDisabledFocus={true}
                onClick={this.onLogin}
              />
            )}

            {status === 'in-progress' && <Spinner size={SpinnerSize.large} />}
          </Stack>
          {this.renderErrorMessageBar()}
        </Stack>
      </Stack>
    );
  }
}

export default withRouter(
  connect<StateProps, DispatchProps, {}, RootAppState>(
    LoginPage.mapStateToProps,
    LoginPage.mapDispatchToProps
  )(LoginPage)
);
