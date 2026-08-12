import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { ToastProvider } from './context/ToastContext';
import { SampleCartProvider } from './context/SampleCartContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { AudioFXProvider } from './context/AudioFXContext';

function Root() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ToastProvider>
          {({ addToast }) => (
            <SampleCartProvider showToast={addToast}>
              <CommandPaletteProvider>
                <AudioFXProvider>
                  <App />
                </AudioFXProvider>
              </CommandPaletteProvider>
            </SampleCartProvider>
          )}
        </ToastProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Fixed ToastProvider wrapper pattern
function AppRoot() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ToastProvider>
          <MainWithProviders />
        </ToastProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

function MainWithProviders() {
  return (
    <SampleCartProvider>
      <CommandPaletteProvider>
        <AudioFXProvider>
          <App />
        </AudioFXProvider>
      </CommandPaletteProvider>
    </SampleCartProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppRoot />);
