import { useState } from "react";
import CategoryPills from "./components/CategoryPills";
import { categories } from "./data/home";
import PageHeader from "./layouts/PageHeader";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="max-h-screen flex flex-col">
      {/*header */}
      <PageHeader />

      {/*scrollable section + sidebar + categories */}

      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        {/*sidebar */}
        <div>sidebar</div>

        {/*categories */}
        <div className="overflow-x-hidden p-8 pb-4">
          <div className="sticky z-10 top-0 pb-5 ">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>

        {/*scrollable grid section of the page with videos */}
        <div className=""></div>
      </div>
    </div>
  );
}

export default App;
//border-4 border-red-700
//border-4 border-blue-700
