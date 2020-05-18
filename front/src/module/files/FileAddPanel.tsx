import React, { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Stack } from '@fluentui/react/lib/Stack';
import { ControlGroup } from 'components/panel';
import FileType from 'file-type/browser';
import { Label } from '@fluentui/react/lib/Label';

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

const FileAddPanel: React.FunctionComponent<Props> = props => {
  const [fileMimeType, setFileMimeType] = useState<string>('');

  const fileRef = React.createRef<HTMLInputElement>();
  const acceptFiles = ['image/png', 'image/jpeg'].join(',');

  const handelOnDismiss = () => {
    props.onClose();
  };

  const handleOnFileChange = async () => {
    if (fileRef && fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
      const file = fileRef.current.files[0];

      const fileType = await FileType.fromBlob(file);

      if (fileType) {
        setFileMimeType(fileType.mime);
      } else {
        fileRef.current.value = '';
        setFileMimeType('');
      }
    }
  };

  return (
    <>
      <Panel isOpen={true} headerText="Upload file" onDismiss={handelOnDismiss} type={PanelType.smallFixedFar}>
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { marginBottom: 30, marginTop: 20 } }}>
          <input type="file" ref={fileRef} onChange={handleOnFileChange} accept={acceptFiles} />
          <Label>{fileMimeType}</Label>
        </Stack>
        <ControlGroup />
      </Panel>
    </>
  );
};

export default FileAddPanel;
