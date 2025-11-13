import { useEffect, useState } from "react";
import { searchCharacter } from "../services/itemsService";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Items.css";

const ItemsList = () => {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await searchCharacter(query || "rick", page);
      setCharacters(data.results || []);
      setTotalPages(data.info.pages || 1);
    } catch (err) {
      setCharacters([]);
      setError("No characters found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCharacters();
  };

  return (
    <div className="items-page">
      <h2>Character Search</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <Spinner />}

      {error && <ErrorBox message={error} />}

      {!loading && !error && (
        <>
          <div className="characters-grid">
            {characters.map((char) => (
              <Link
                key={char.id}
                to={`/items/${char.id}`}
                className="character-card"
              >
                <img src={char.image} alt={char.name} />
                <h3>{char.name}</h3>
                <p>{char.species}</p>
              </Link>
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ⬅ Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsList;


// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import ErrorBox from "../components/ErrorBox";
// import Card from "../components/Card"; // карточка для персонажа
// import "../styles/Items.css";

// export default function Characters() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const q = searchParams.get("q") || "";
//   const pageParam = parseInt(searchParams.get("page")) || 1;

//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(pageParam);
//   const [totalPages, setTotalPages] = useState(1);

//   const [statusFilter, setStatusFilter] = useState("");
//   const [speciesFilter, setSpeciesFilter] = useState("");

//   useEffect(() => {
//     let mounted = true;
//     if (!q.trim()) {
//       setCharacters([]);
//       setLoading(false);
//       setError(null);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     fetch(`https://rickandmortyapi.com/api/character/?name=${q}&page=${page}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Characters not found");
//         return res.json();
//       })
//       .then((data) => {
//         if (!mounted) return;
//         setCharacters(data.results || []);
//         setTotalPages(data.info?.pages || 1);
//       })
//       .catch((err) => {
//         if (!mounted) return;
//         setError(err.message);
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => { mounted = false };
//   }, [q, page]);

//   function onChange(e) {
//     const v = e.target.value;
//     setPage(1);
//     if (v) setSearchParams({ q: v, page: 1 });
//     else setSearchParams({});
//   }

//   function goToPage(p) {
//     if (p < 1 || p > totalPages) return;
//     setPage(p);
//     const params = { ...Object.fromEntries(searchParams.entries()), page: p };
//     setSearchParams(params);
//   }

//   const filteredCharacters = characters.filter((c) => {
//     const statusMatch = statusFilter ? c.status.toLowerCase() === statusFilter.toLowerCase() : true;
//     const speciesMatch = speciesFilter ? c.species.toLowerCase() === speciesFilter.toLowerCase() : true;
//     return statusMatch && speciesMatch;
//   });

//   return (
//     <div className="items-page">
//       <h2 className="page-title">Rick & Morty Characters</h2>

//       <div className="search-row">
//         <input
//           className="search-input"
//           placeholder="Search by name..."
//           value={q}
//           onChange={onChange}
//         />
//       </div>

//       {q.trim() === "" ? (
//         <div className="empty-search">
//           <h3>Start exploring 🛸</h3>
//           <p>Type a character name to begin your search.</p>
//         </div>
//       ) : (
//         <>
//           <div className="filter-row">
//             <input
//               className="filter-input"
//               placeholder="Filter by status"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             />
//             <input
//               className="filter-input"
//               placeholder="Filter by species"
//               value={speciesFilter}
//               onChange={(e) => setSpeciesFilter(e.target.value)}
//             />
//           </div>

//           {loading && <Spinner />}
//           {error && <ErrorBox>{error}</ErrorBox>}

//           {!loading && !error && (
//             <>
//               <div className="items-grid">
//                 {filteredCharacters.length === 0 && <p className="no-results">No matching characters.</p>}
//                 {filteredCharacters.map((c) => (
//                   <Card key={c.id} item={{ ...c, id: c.id }} />
//                 ))}
//               </div>

//               {totalPages > 1 && (
//                 <div className="pagination">
//                   <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
//                     ← Prev
//                   </button>
//                   <span>Page {page} of {totalPages}</span>
//                   <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
//                     Next →
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
