import { useQuery } from "@tanstack/react-query";
import { getProviders } from "../services/ProviderService";
import { useState } from "react";
import ProviderCard from "./ProvidersCard";
import "../pageStyles/ProvidersByCategory.css"
import CreateAppointmentDrawer from "./CreateAppointmentDrawer";

const ProvidersByCategory = ({category,onBack}) => {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search,setSearch] = useState(null);
    const [page,setPage] = useState(0);

    const { data: providers, isLoading, isError } = useQuery({
        queryKey: ["providers", category, search, page],
        queryFn: () => getProviders(0, search, page, 10, category),
    });
    if (isLoading) return <p>Loading providers...</p>;
    if (isError) return <p>Failed to load providers</p>;
    return (
      <div className="provider-div">
        <div className="provider-header-container">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <h2 className="provider-header">{category} Providers</h2>
        </div>

        <div className="provider-grid">
          {providers?.data.length > 0 ? (
            providers.data.map((p) => (
              <ProviderCard
                key={p.id}
                provider={p}
                onSelect={(provider) => {
                  setSelectedProvider(provider);
                  setDrawerOpen(true);
                }}
              />
            ))
          ) : (
            <p>No providers found.</p>
          )}
        </div>
        {/* {selectedProvider && ( */}
        <CreateAppointmentDrawer
          provider={selectedProvider}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        />
        {/* )} */}
      </div>
    );
};
export default ProvidersByCategory;