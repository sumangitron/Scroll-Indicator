import ScrollIndicator from "./components";

function App() {
  return (
    <div className="app">
      <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} />
    </div>
  );
}

export default App;
