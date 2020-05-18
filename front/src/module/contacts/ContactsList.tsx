import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ContactRecord } from 'api/model';
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { RootAppState } from 'store';
import { ContactApi } from 'api';
import { API_BASE_URL } from 'constant';

interface StateProps {
  token: string;
}

type ContactColumn = { fieldName?: keyof ContactRecord } & IColumn;
const setupColumns = () => {
  return [
    {
      key: 'country',
      minWidth: 50,
      name: 'Country',
      fieldName: 'country'
    },
    {
      key: 'email',
      minWidth: 200,
      name: 'email',
      fieldName: 'email'
    },
    {
      key: 'name',
      minWidth: 250,
      name: 'Id',
      onRender: (item: ContactRecord) => {
        return (
          <>
            {item.surname} {item.name}
          </>
        );
      }
    }
  ];
};

const ContactsList: React.FC = (props) => {
  const [list, setList] = useState<ContactRecord[]>([]);
  const columns = setupColumns();

  const { token } = useSelector<RootAppState, StateProps>(({ app }) => ({
    token: app.token
  }));

  useEffect(() => {
    const loadData = async () => {
      if (!token) return;
      const api = new ContactApi(API_BASE_URL, token);
      const result = await api.query({ query: '', offset: 0, limit: 999 });
      if (result.status === 200) {
        setList(result.data);
      }
    };

    loadData();
  }, [token]);

  return <ShimmeredDetailsList columns={columns} items={list} />;
};

export default ContactsList;
