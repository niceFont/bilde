import * as React from 'react';
import {
  Flex, Heading, Link,
} from '@chakra-ui/react';

export interface NavBarProps {

}

const NavBar = () => (
  <Flex justifyContent="space-between" color="white" padding="1.2rem" bg="teal.500" as="nav" align="center">
    <Heading as="h1" size="lg">
      Bilde
    </Heading>
    <Link target="_blank" href="https://github.com/niceFont">Github</Link>
  </Flex>
);

export default NavBar;
