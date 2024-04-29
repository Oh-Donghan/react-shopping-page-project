import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

// 작동이 안되는 이유를 모르겠습니다 ㅠㅠ
const ScrollTop = () => {
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname, params]);

  return null;
};

export default ScrollTop;
