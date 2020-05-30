import React, { useState } from 'react';
import { ListCommandBar } from 'components/listCommandBar';
import FileAddPanel from './FileAddPanel';

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
