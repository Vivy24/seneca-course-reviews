import { Button } from '@chakra-ui/react';
import { useRouteMatch } from 'hooks/useRouteMatch';
import NextLink, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

type Props = LinkProps & { exact?: boolean };
export const MenuLink = ({
  exact,
  children,
  ...linkProps
}: PropsWithChildren<Props>) => {
  const isActive = useRouteMatch(linkProps.href.toString(), exact);

  return (
    <NextLink {...linkProps} passHref>
      <Button
        colorScheme="blackAlpha"
        as="a"
        isActive={isActive}
        variant="link"
      >
        {children}
      </Button>
    </NextLink>
  );
};
