import React from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
  ICommandBarStyles,
} from '@fluentui/react/lib/CommandBar';

interface Props {
  onNew: () => void; //
  items?: ICommandBarItemProps[];
  farItems?: ICommandBarItemProps[];
}

const ListCommandBar: React.FunctionComponent<Props> = (props) => {
  const style: Partial<ICommandBarStyles> = {
    root: {
      borderBottom: '1px solid #ddd',
      marginBottom: '20px',
      marginTop: 10,
    },
  };

  const items: ICommandBarItemProps[] = [
    {
      key: 'New',
      onClick: props.onNew,
      text: 'Add new',
      iconProps: {
        iconName: 'Add',
      },
    },
  ];

  const farItems: ICommandBarItemProps[] = [];
  if (props.farItems && props.farItems.length > 0) {
    farItems.concat(props.farItems);
  }

  return <CommandBar styles={style} items={items} />;
};

export default ListCommandBar;
