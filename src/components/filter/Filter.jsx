import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";

function Filter() {
  const [seracgParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: seracgParams.get("type") || "",
    city: seracgParams.get("city") || "",
    property: seracgParams.get("property") || "",
    minPrice: seracgParams.get("minPrice") || 0,
    maxPrice: seracgParams.get("maxPrice") || 0,
    bedroom: seracgParams.get("bedroom") || 1,
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        <b>{seracgParams.get("city")}</b>的搜索结果
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">城市</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="城市"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">类型</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">户型</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">最低价格</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">最高价格</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">卧室数量</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleClick}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
