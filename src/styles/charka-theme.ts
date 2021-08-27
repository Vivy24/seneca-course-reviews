import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = {
  ...extendTheme(withDefaultColorScheme({ colorScheme: 'blue' })),
  fonts: {
    heading:
      'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    body: 'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  styles: {
    global: {
      'html, body': {
        width: '100%',
        height: '100%',
        fontSize: '1rem',
        color: 'gray.700',
      },
      '#__next': {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        'WebkitFontSmoothing?': 'antialiased',
        'MozOsxFontSmoothing?': 'grayscale',
      },
      '*': {
        borderColor: 'gray.200',
      },
    },
  },
};

export default theme;
