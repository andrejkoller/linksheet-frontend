import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="home">
        <Home />
      </div>
    </div>
  );
}

export default App;
