import { IImageStyles } from '@fluentui/react/lib/Image';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import { getTheme } from '@uifabric/styling';

const theme = getTheme();

export const loginStackStyles: IStackStyles = {
  root: {
    padding: '40px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    minWidth: '400px',
    marginTop: '200px',
    backgroundColor: theme.palette.white,
  },
};

export const logoStyles: IImageStyles = {
  root: {
    background: theme.palette.themeDarkAlt,
    padding: '10px',
    boxSizing: 'border-box',
  },
  image: {
    maxHeight: '180px',
  },
};
