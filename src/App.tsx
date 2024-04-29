import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { useRef } from "react";
import ScrollTop from "./components/common/ScrollTop";

const App = (): JSX.Element => {
  // input 타입이 체크박스여서 클릭할때마다 체크박스의 상태가 토글된다!
  const hamburgerButton = useRef<HTMLInputElement>(null);
  const closeOverlay = () => {
    console.log("is Closed?", hamburgerButton);
    // useRef로 생성된 참조의 속성
    hamburgerButton.current?.click();
  };

  return (
    <BrowserRouter>
      <ScrollTop />
      <input type="checkbox" id="side-menu" className="drawer-toggle" ref={hamburgerButton} />
      <section className="drawer-content">
        {/* Nav를 렌더링 하세요 */}
        <Nav />
        <section className="main pt-16">
          <Router />
        </section>
        {/* Footer를 렌더링 하세요 */}
        <Footer />
      </section>
      <Drawer closeOverlay={closeOverlay} />
    </BrowserRouter>
  );
};

export default App;
