import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type === "buy" ? "出售" : "出租"}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          onChange={handleChange}
          placeholder="城市"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="最低价格"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="最高价格"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
