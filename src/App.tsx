import React from "react";

import { GlobalProvider } from "./context/Global";
import { Router } from "./routes/Routes";

function App() {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
