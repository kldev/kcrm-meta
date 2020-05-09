import React, { useState } from 'react';
import FileAddPanel from './FileAddPanel';
import { ListCommandBar } from 'components/listCommandBar';

const FilesPage: React.FunctionComponent = () => {
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

      {showAdd && <FileAddPanel onAdded={() => {}} onClose={handleAddClose} />}
    </>
  );
};

export default FilesPage;
