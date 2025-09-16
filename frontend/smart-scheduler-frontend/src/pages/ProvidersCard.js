import "../pageStyles/ProviderCard.css";

const ProviderCard = ({ provider, onSelect }) => {
  return (
    <div className="provider-card" onClick={() => {
        console.log(`hello ${provider}`)
        onSelect(provider)}}>
      <div className="provider-avatar">
        {provider.name.charAt(0).toUpperCase()}
      </div>
      <div className="provider-info">
        <h3 className="provider-name">{provider.name}</h3>
        <p className="provider-profession">{provider.profession?.name}</p>
        <p className="provider-email">{provider.email}</p>
      </div>
      <div className="provider-actions">
        <button className="book-btn" >Book</button>
      </div>
    </div>
  );
};

export default ProviderCard;
