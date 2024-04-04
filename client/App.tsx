import React from 'react';
import Main from './src/Main';
import {Provider} from 'react-redux';
import store from './src/app/store';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
