import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Navigation = (props) => {
  const navigate = useNavigate();
  const url = useLocation().search;
  const keyword = new URLSearchParams(url).get("keyword");
  const search = props.search;
  const nav = useRef(null);
  const selected = useRef(null);
  const regCategory = /category=[a-z]+/g;
  const regPage1 = /&page=[0-9]+/g;

  const navButtons = [];
  const navValues = [
    ["all", "전체"],
    ["concert", "콘서트"],
    ["musical", "뮤지컬"],
    ["theater", "연극"],
  ];

  navValues.map((value) => {
    const newSearch = search
      ? url.replace(regCategory, `category=${value[0]}`).replace(regPage1, ``)
      : value[0]
      ? `?category=${value[0]}`
      : "";
    const path = search
      ? `/performance/search${newSearch}`
      : `/performance${newSearch}`;
    navButtons.push(
      <button
        className="category-button"
        onClick={() => navigate(path)}
        value={value[0]}
        key={value[0]}
      >
        {value[1]}
      </button>
    );
  });

  useEffect(() => {
    const buttons = Object.values(nav.current.children);
    for (const button of buttons) {
      if (selected.current) {
        selected.current.classList.remove("active");
        selected.current = null;
      }
      if ((!search && !keyword) || (search && keyword)) {
        if (url.includes(button.value)) {
          button.classList.add("active");
          selected.current = button;
          break;
        }
      }
    }
  }, [url]);

  return (
    <nav className="category-buttons" ref={nav}>
      {navButtons}
    </nav>
  );
};

export default Navigation;
