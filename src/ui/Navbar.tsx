import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { MenuLink } from './MenuLink';

function Navbar() {
  return (
    <Box
      as="header"
      py="3"
      px={5}
      borderBottom="1px"
      borderBottomColor="gray.200"
    >
      <Box as="nav">
        <UnorderedList
          display="flex"
          gridGap="3"
          listStyleType="none"
          justifyContent="flex-end"
        >
          <ListItem>
            <MenuLink href="/" exact>
              Home
            </MenuLink>
          </ListItem>
          <ListItem>
            <MenuLink href="/courses">Courses</MenuLink>
          </ListItem>
          <ListItem>
            <MenuLink href="/professors">Professors</MenuLink>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
}

export default Navbar;
