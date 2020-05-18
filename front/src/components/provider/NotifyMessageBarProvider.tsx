import React from 'react';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { MessageBarType, MessageBar } from '@fluentui/react/lib/MessageBar';
import { MessageBarButton } from '@fluentui/react/lib/Button';
import { Layer } from '@fluentui/react/lib/Layer';

const NotifyMessageBarProvider: React.FunctionComponent = props => {
  const stackStyles: Partial<IStackStyles> = {
    root: {
      position: 'fixed',
      bottom: 20,
      right: 20,
      maxHeight: '75vh',
      maxWidth: '500px',
      overflow: 'auto',
      background: '#ddd',
      padding: 20,
      opacity: 1
    }
  };

  const stackTokens: Partial<IStackTokens> = {
    childrenGap: 20
  };

  const errors: number[] = [];

  const errorsElements = errors.map<JSX.Element>(x => {
    return (
      <MessageBar
        style={{ position: 'relative' }}
        key={x}
        dismissButtonAriaLabel="Close"
        messageBarType={MessageBarType.warning}
        actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }
      >
        <b>Warning defaults to multiline</b>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus,
        purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc
        semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo.
        Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac
        habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem,
        ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum
        mauris.
      </MessageBar>
    );
  });

  return (
    <>
      {props.children}
      {errors.length && (
        <Layer className="message-bar-layer">
          <Stack className="message-bar-stack" styles={stackStyles} tokens={stackTokens}>
            {errorsElements}
          </Stack>
        </Layer>
      )}
    </>
  );
};

export default NotifyMessageBarProvider;
