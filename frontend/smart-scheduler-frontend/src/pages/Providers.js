import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProfessions } from "../services/Utils";
import { getProviders } from "../services/ProviderService";
import "../pageStyles/ProviderPageStyle.css"
import CategoryGrid from "./ProviderCategoryGrid";

const Providers = () => {
//     const [professionId,setProfessionId] = useState(0);
//     const [search,setSearch] = useState("");
    
//     const [limit,setLimit] = useState(1000);
//   const { data: profession = [] } = useQuery({
//     queryKey: ["professions"],
//     queryFn: () => getProfessions(),
//   });
//   const { data: providers  } = useQuery({
//     queryKey: ["providers"],
//     queryFn: () => getProviders(professionId, search, 0,limit),
//   });

//   const groupedProviders = [
//     ...new Set(profession.map((p) => p.category)),
//   ].reduce((acc, category) => {
//     acc[category] = providers.data.filter(
//       (prov) => prov.profession.category === category
//     );
//     return acc;
//   }, {});

//   return (
//     <div className="provider-containers">
//       <h2 className="providers-title"> Providers </h2>
//       {Object.keys(groupedProviders).map((category) => {
//       if (groupedProviders[category].length == 0) return <></>;
//       else
//         return (
//           <div key={category} className="provider-catagory">
//             <h3 className="category-title"> {category}</h3>

//             <div className="provider-list">
//               {groupedProviders[category].map((provider) => (
//                 <div key={provider.id} className="provider-card">
//                   <h4 className="provider-name">{provider.name}</h4>
//                   <p className="provider-profession">
//                     {provider.profession.name}
//                   </p>
//                   <p className="provider-email">{provider.email}</p>
//                   {provider.description && (
//                     <p className="provider-description">
//                       {provider.description}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );})}
//     </div>
//   );


  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {!selectedCategory ? (
        <CategoryGrid onCategorySelect={setSelectedCategory} />
      ) : (
        <div>
          <h2>{selectedCategory} Providers</h2>
          {/* here you render the providers list */}
        </div>
      )}
    </div>
  );
};



export default Providers;
