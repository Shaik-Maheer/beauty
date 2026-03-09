const FilterBar = ({ onCategoryChange, onBrandChange }) => {
    return (
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between bg-pink-100 p-4 rounded-lg shadow">
        <select
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2 rounded border border-pink-300"
        >
          <option value="">All Categories</option>
          <option value="lipstick">Lipstick</option>
          <option value="foundation">Foundation</option>
          <option value="eyeliner">Eyeliner</option>
          <option value="blush">Blush</option>
          <option value="mascara">Mascara</option>
        </select>
  
        <select
          onChange={(e) => onBrandChange(e.target.value)}
          className="p-2 rounded border border-pink-300"
        >
          <option value="">All Brands</option>
          <option value="maybelline">Maybelline</option>
          <option value="revlon">Revlon</option>
          <option value="covergirl">Covergirl</option>
          <option value="l'oreal">L'Oreal</option>
          <option value="nyx">NYX</option>
        </select>
      </div>
    );
  };
  
  export default FilterBar;
  