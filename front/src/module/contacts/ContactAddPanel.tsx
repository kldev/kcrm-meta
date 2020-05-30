import React, { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Stack } from '@fluentui/react/lib/Stack';
import { ControlGroup } from 'components/panel';
import { CountryPicker } from 'components/forms/CountryPicker';
import { CountryRecord } from 'api/model';
import { TextField } from '@fluentui/react/lib/TextField';

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

interface StateProps {}

const ContactAddPanel: React.FunctionComponent<Props> = (props) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handelOnDismiss = () => {
    props.onClose();
  };

  const handleCountryChange = (countries: CountryRecord[]) => {
    console.log(`$$$ ${JSON.stringify(countries)}`);
  };

  const initialSelection: CountryRecord[] = [
    { iso2: 'PL', name: 'Poland', code: 616 },
  ];

  return (
    <>
      <Panel
        isOpen={true}
        headerText="Add contact"
        onDismiss={handelOnDismiss}
        type={PanelType.smallFixedFar}
      >
        <Stack
          tokens={{ childrenGap: 15 }}
          styles={{ root: { marginBottom: 30, marginTop: 20 } }}
        >
          <TextField
            label="First name"
            value={name}
            onChange={(ev, value) => {
              setName(value as string);
            }}
            autoComplete="off"
          />
          <TextField
            label="Last name"
            value={lastName}
            onChange={(ev, value) => {
              setLastName(value as string);
            }}
            autoComplete="off"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(ev, value) => {
              setEmail(value as string);
            }}
            autoComplete="off"
          />
          <CountryPicker
            initial={initialSelection}
            onChange={handleCountryChange}
          />
        </Stack>
        <ControlGroup />
      </Panel>
    </>
  );
};

export default ContactAddPanel;
