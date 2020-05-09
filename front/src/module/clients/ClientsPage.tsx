import React, { useState } from 'react';
import { ListCommandBar } from 'components/listCommandBar';
import { Panel } from '@fluentui/react/lib/Panel';

const ClientPage: React.FunctionComponent = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const handleOnNew = () => {
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
  };

  return (
    <>
      <ListCommandBar onNew={handleOnNew} />

      {showAdd && <Panel headerText="Add Client" onDismiss={handleAddClose} />}
    </>
  );
};

export default ClientPage;
