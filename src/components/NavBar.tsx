import * as React from 'react';
import {
  Flex, Heading,
} from '@chakra-ui/react';

export interface NavBarProps {

}

const NavBar = () => (
  <Flex color="white" padding="1.2rem" bg="teal.500" as="nav" align="center">
    <Heading as="h1" size="lg">
      ReactOCR
    </Heading>
  </Flex>
);

export default NavBar;
