import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

const ControlGroup: React.FunctionComponent = () => {
  return (
    <Stack
      horizontal
      horizontalAlign="end"
      grow
      tokens={{
        childrenGap: 15,
      }}
    >
      <PrimaryButton text="Save" />
      <DefaultButton text="Cancel" />
    </Stack>
  );
};

export default ControlGroup;
