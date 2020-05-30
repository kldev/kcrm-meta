import React from 'react';

import {
  IContextualMenuItem,
  IContextualMenuProps,
  ContextualMenuItemType,
} from '@fluentui/react/lib/ContextualMenu';
import { Login as LoginPath } from 'constant/Paths';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { logout } from 'store/app';
import { toggle } from 'store/nav';
import { Stack } from '@fluentui/react/lib/Stack';
import { ActionButton } from '@fluentui/react/lib/Button';
import {
  ICommandBarItemProps,
  CommandBar,
} from '@fluentui/react/lib/CommandBar';
import { AppName } from 'constant/Env';
import { getTheme } from '@fluentui/react/lib/Styling';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { RootAppState } from 'store';
import {
  outerCommandBarStyles,
  commandBarWaffleButtonStyles,
} from './LayoutCommandBarConst';

interface DispatchProps {
  // TODO: showProfile, showPasswordReset
  logout: () => void;
  toggle: () => void;
}

interface StateProps {
  username: string;
  title: string;
}

interface OwnProps {}

const theme = getTheme();

type Props = DispatchProps & DispatchProps & StateProps & RouteComponentProps;

class LayoutCommandBar extends React.Component<Props> {
  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
    dispatch
  ) => ({
    logout: () => {
      dispatch(logout());
    },
    toggle: () => {
      dispatch(toggle());
    },
  });

  static mapStateToProps: MapStateToProps<StateProps, {}, RootAppState> = ({
    nav,
    app,
  }) => ({
    username: app.username,
    title: nav.title,
  });

  onShowProfile = () => {
    // todo:
  };

  onShowResetPassword = () => {
    // todo:
  };

  onLogout = () => {
    // this.props.logOut();
    this.props.history.push(LoginPath);
  };

  getFarItems = (): IContextualMenuItem[] => {
    const { username } = this.props;

    const menuItems: IContextualMenuProps = {
      shouldFocusOnMount: true,
      items: [
        {
          key: 'myProfile',
          text: 'My profile',
          iconProps: {
            iconName: 'ProfileSearch',
            style: {
              color: '#258DE',
            },
          },
          onClick: () => {
            this.onShowProfile();
          },
        },

        {
          key: 'changePassword',
          text: 'Change password',
          iconProps: {
            iconName: 'PasswordField',
            style: {
              color: '#258DE',
            },
          },
          onClick: () => {
            this.onShowResetPassword();
          },
        },

        {
          key: 'logOut',
          text: 'Sign out',
          onClick: this.onLogout,
          iconProps: {
            iconName: 'SignOut',
            style: {
              color: '#258DE',
            },
          },
        },
      ],
    };

    return [
      {
        key: 'welcome',
        name: `${username}`,
        itemType: ContextualMenuItemType.Normal,
        onRender: (item) => {
          return (
            <Stack verticalAlign="center">
              <span>
                <span> {username} </span>
              </span>
            </Stack>
          );
        },
      },
      {
        key: 'button',
        onRender: () => {
          return (
            <Stack verticalAlign="center">
              <ActionButton
                iconProps={{ iconName: 'CollapseMenu' }}
                menuIconProps={{ iconName: '' }}
                menuProps={menuItems}
              />
            </Stack>
          );
        },
      },
    ];
  };

  getOuterItems = (): ICommandBarItemProps[] => {
    const { title } = this.props;

    const items: ICommandBarItemProps[] = [
      {
        key: 'WaffleButton',
        iconOnly: true,
        iconProps: {
          iconName: 'Waffle',
          styles: {
            root: {
              color: 'white',
              fontSize: 20,
              fontWeight: 600,
            },
          },
        },
        buttonStyles: commandBarWaffleButtonStyles,
        onClick: () => {
          this.props.toggle();
        },
      },
      {
        key: 'appName',
        name: AppName,
        onClick: () => {
          this.props.history.push('/');
        },
        buttonStyles: {
          root: {
            backgroundColor: '#eee',
            fontSize: 22,
            marginLeft: 20,
            padding: 0,
            cursor: 'pointer',
          },
          rootHovered: {
            backgroundColor: '#eee',
            cursor: 'pointer',
          },
          rootPressed: {
            backgroundColor: '#eee',
            cursor: 'pointer',
          },
          label: {
            color: theme.palette.themeDarkAlt,
            margin: 0,
            cursor: 'pointer',
          },
        },
      },
    ];

    if (title && title.length > 0) {
      items.push({
        key: 'appSubHeader',
        name: `| ${title}`,
        buttonStyles: {
          root: {
            backgroundColor: '#eee',
            fontSize: 16,
            marginLeft: 20,
            padding: 0,
            cursor: 'pointer',
          },
          rootHovered: {
            backgroundColor: '#eee',
          },
          rootPressed: {
            backgroundColor: '#eee',
          },
          label: {
            color: theme.palette.magentaDark,
            margin: 0,
            cursor: 'pointer',
          },
        },
      });
    }

    return items;
  };

  render() {
    const outerCommandBarItems = this.getOuterItems();
    const farCommandBarItems = this.getFarItems();

    return (
      <CommandBar
        items={outerCommandBarItems}
        farItems={farCommandBarItems}
        styles={outerCommandBarStyles}
      />
    );
  }
}

export default withRouter(
  connect<StateProps, DispatchProps, {}, RootAppState>(
    LayoutCommandBar.mapStateToProps,
    LayoutCommandBar.mapDispatchToProps
  )(LayoutCommandBar)
);
