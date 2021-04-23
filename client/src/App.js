import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./globalState";
import Pages from "./components/mainpages/pages";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="container">
          <Pages />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
