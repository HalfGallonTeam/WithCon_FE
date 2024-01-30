import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const url = useLocation();
  const pageNum = new URLSearchParams(url.search).get("page");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [url.pathname, pageNum]);
  return;
};

export default ScrollToTop;
