import React, { useState } from 'react';
import { ListCommandBar } from 'components/listCommandBar';
import ContactAddPanel from './ContactAddPanel';
import ContactsList from './ContactsList';

const ContactsPage: React.FunctionComponent = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const handleOnNew = () => {
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
  };
  const handleAddOnAdded = () => {};

  return (
    <>
      <ListCommandBar onNew={handleOnNew} />
      <ContactsList />

      {showAdd && (
        <ContactAddPanel onAdded={handleAddOnAdded} onClose={handleAddClose} />
      )}
    </>
  );
};

export default ContactsPage;
