import React from 'react';

import { Nav, INavLink, INavStyles } from '@fluentui/react/lib/Nav';
import { connect, MapStateToProps } from 'react-redux';
import * as paths from 'constant/Paths';
import * as roles from 'constant/Roles';
import { RootAppState } from 'store';

import { Stack, IStackItemStyles } from '@fluentui/react/lib/Stack';
import { withRouter, RouteComponentProps } from 'react-router';

interface RoleNavLink extends INavLink {
  allowed: string[];
}

const menuLinks: RoleNavLink[] = [
  {
    isLink: false,
    key: 'contacts',
    name: 'Contacts',
    url: paths.Contacts,
    icon: 'ContactList',
    allowed: [roles.Root, roles.Admin, roles.User]
  },
  {
    isLink: false,
    key: 'clients',
    name: 'Clients',
    url: paths.Clients,
    icon: 'CompanyDirectory',
    allowed: [roles.Root, roles.Admin, roles.User]
  },
  {
    isLink: false,
    key: 'files',
    name: 'Files',
    url: paths.Files,
    icon: 'FabricFolder',
    allowed: [roles.Root, roles.Admin]
  }
];

interface StateProps {
  pages: RoleNavLink[];
}

type Props = StateProps & RouteComponentProps;

export class NavigationMenu extends React.Component<Props> {
  static mapStateToProps: MapStateToProps<StateProps, {}, RootAppState> = ({ app }) => {
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const role = app.role;

    return {
      pages: [...menuLinks]
    };
  };

  public constructor(props: Props) {
    super(props);
  }

  onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (ev) {
      ev.nativeEvent.preventDefault();
    }

    if (item) {
      this.props.history.push(item.url);
    }
  };
  render() {
    const styles: Partial<INavStyles> = {
      root: {
        width: 208,
        height: 350,
        boxSizing: 'border-box',
        overflowY: 'auto',
        paddingLeft: '5px',
        paddingRight: '5px'
      },
      navItem: {
        marginTop: '2px'
      }
    };

    const stackStyles: Partial<IStackItemStyles> = {
      root: {
        background: 'none',
        borderRight: '1px solid #ddd',
        paddingTop: '5px',
        boxSizing: 'border-box'
      }
    };

    const { pages } = this.props;

    return (
      <Stack.Item styles={stackStyles} verticalFill={true}>
        <Nav
          onLinkClick={this.onLinkClick}
          styles={styles}
          groups={[
            {
              links: pages
            }
          ]}
        />
      </Stack.Item>
    );
  }
}

export default withRouter(
  connect<StateProps, {}, {}, RootAppState>(NavigationMenu.mapStateToProps, {})(NavigationMenu)
);
