import Dashboard from './components/Dashboard'

// src/App.js (or your root component)
import { GridProvider } from './hooks/useGridData';

function App() {
  return (
    <GridProvider>
      <Dashboard />
    </GridProvider>
  );
}

export default App