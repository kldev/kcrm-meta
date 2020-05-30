import React from 'react';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

interface Props {
  hidden: boolean;
  message: string;
  yesButton: string;
  noButton: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: React.FC<Props> = (props) => {
  const { message, hidden } = props;

  return (
    <Dialog
      hidden={hidden}
      modalProps={{}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: message,
        subText: '',
      }}
    >
      <DialogFooter>
        <PrimaryButton
          text={props.yesButton}
          onClick={() => props.onConfirm()}
        />
        <DefaultButton text={props.noButton} onClick={() => props.onCancel()} />
      </DialogFooter>
    </Dialog>
  );
};
