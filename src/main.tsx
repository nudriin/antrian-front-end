import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import blue from './theme/blue.ts';

const theme = extendTheme(blue);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider
            theme={theme}
            toastOptions={{
                defaultOptions: {
                    position: 'top',
                    variant: 'left-accent',
                    duration: 5000,
                    isClosable: true,
                },
            }}
        >
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <App />
            </CookiesProvider>
        </ChakraProvider>
    </StrictMode>
);
