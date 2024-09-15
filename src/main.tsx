import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <App />
            </CookiesProvider>
        </ChakraProvider>
    </StrictMode>
);
