import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProfessions } from "../services/Utils";
import { getProviders } from "../services/ProviderService";
import "../pageStyles/ProviderPageStyle.css"
import CategoryGrid from "./ProviderCategoryGrid";
import ProvidersByCategory from "./ProvidersByCategory";

const Providers = () => {



  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {!selectedCategory ? (
        <CategoryGrid onCategorySelect={setSelectedCategory} />
      ) : (
        <ProvidersByCategory category={selectedCategory} onBack = {()=> setSelectedCategory(null)} />
      )}
    </div>
  );
};



export default Providers;
