import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Navigation = (props) => {
  const navigate = useNavigate();
  const url = useLocation();
  const search = props.search;
  const regCategory = /category=[a-z]+/g;
  const path = search ? url.search : url.pathname;
  const nav = useRef(null);
  const selected = useRef(null);

  const navButtons = [];
  const navValues = [
    ["all", "전체"],
    ["concert", "콘서트"],
    ["musical", "뮤지컬"],
    ["play", "연극"],
  ];

  navValues.map((value) => {
    const newSearch = url.search.replace(regCategory, `category=${value[0]}`);
    const path = search ? `/search${newSearch}` : `/performance/${value[0]}`;
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
      }
      if (path.includes(button.value)) {
        button.classList.add("active");
        selected.current = button;
        break;
      }
    }
  }, [path]);

  return (
    <nav className="category-buttons" ref={nav}>
      {navButtons}
    </nav>
  );
};

export default Navigation;
