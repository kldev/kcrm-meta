import React from 'react';
import { CountryRecord, CommonQuery } from 'api/model';
import { useSelector } from 'react-redux';
import { RootAppState } from 'store';
import { CountryApi } from 'api';
import { API_BASE_URL } from 'constant';
import { CompactPeoplePicker } from '@fluentui/react/lib/Pickers';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';

interface Props {
  onChange: (countries: CountryRecord[]) => void;
  initial?: CountryRecord[];
  limit?: number;
  label?: string;
}

interface StateProps {
  token: string;
}

const CountryPicker: React.FunctionComponent<Props> = props => {
  const { token } = useSelector<RootAppState, StateProps>(({ app }) => ({
    token: app.token
  }));

  const api = new CountryApi(API_BASE_URL, token);
  let defaultSelection: IPersonaProps[] = [];

  if (props.initial && props.initial.length > 0) {
    defaultSelection = defaultSelection.concat(
      props.initial.map<IPersonaProps>(x => ({ text: x.name, id: `${x.code}`, secondaryText: x.iso2 }))
    );
  }

  const handleEmptyFocus = () => {
    /// in future here should select most used countries from api
    return handleResolveSuggestions('');
  };

  const handleResolveSuggestions = async (filter: string) => {
    const list = await api.query({ query: filter } as CommonQuery);

    if (list.status === 200) {
      return list.data.map<IPersonaProps>(x => ({
        text: x.name,
        id: `${x.code}`,
        secondaryText: x.iso2
      }));
    }

    return [];
  };

  return (
    <>
      <Stack horizontal={false}>
        <Label>{props.label ? props.label : 'Select country'}</Label>
        <CompactPeoplePicker
          defaultSelectedItems={defaultSelection}
          onEmptyInputFocus={handleEmptyFocus}
          onResolveSuggestions={handleResolveSuggestions}
          itemLimit={props.limit ? props.limit : 1}
        />
      </Stack>
    </>
  );
};

export default CountryPicker;
