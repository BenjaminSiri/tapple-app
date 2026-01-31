// stores/RootStore.ts
import React, { createContext, useContext } from 'react';
import TappleStore from './TappleStore';

class RootStore {
  tappleStore: typeof TappleStore;

  constructor() {
    this.tappleStore = TappleStore;
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = (): RootStore => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useStores must be used within a RootStoreProvider');
  }
  return context;
};

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default rootStore;