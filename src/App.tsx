import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Index from './views/Index';

export default function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <Index />
    </ChakraProvider>
  );
}
