import PageHeader from "./layouts/PageHeader";

function App() {
  return (
    <div className="max-h-screen flex flex-col">
      {/*header */}
      <PageHeader />

      {/*scrollable section + sidebar */}

      <div className="flex">
        {/*sidebar */}
        <div></div>

        {/*scrollable section of the page */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default App;
