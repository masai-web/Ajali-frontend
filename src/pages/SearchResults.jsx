import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchResultsPage() {
  const { results } = useContext(SearchContext);

  return (
    <div className="pt-24 px-6">
      <h1 className="text-2xl font-bold text-center mb-6">Search Results</h1>
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No matching incidents found.</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {results.map((incident) => (
            <li
              key={incident.id}
              className="p-4 bg-white rounded shadow hover:bg-gray-50"
            >
              <h2 className="font-bold text-blue-600">{incident.title}</h2>
              <p className="text-sm text-gray-700">{incident.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResultsPage;
