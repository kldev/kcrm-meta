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

export class ConfirmDialog extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    message: 'Are you sure?',
    yesButton: 'Yes',
    noButton: 'No',
    onCancel: () => {},
    onConfirm: () => {}
  };

  render() {
    const { message } = this.props;

    return (
      <Dialog
        hidden={this.props.hidden}
        modalProps={{}}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: message,
          subText: ''
        }}
      >
        <DialogFooter>
          <PrimaryButton text={this.props.yesButton} onClick={() => this.props.onConfirm()} />
          <DefaultButton text={this.props.noButton} onClick={() => this.props.onCancel()} />
        </DialogFooter>
      </Dialog>
    );
  }
}
