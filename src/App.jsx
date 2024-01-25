import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./assets/css/styles.css";
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./components/common/Home";
import MainPage from "./components/concert/MainPage";
import AdCarousel from "./components/concert/AdCarousel";
import ConLists from "./components/concert/ConLists";
import ConDetail from "./components/concert/ConDetail";
import ConInfo from "./components/concert/ConInfo";
import ChatList from "./components/chat/ChatList";
import MyPage from "./components/mypage/Mypage";
import MyConcert from "./components/mypage/MyConcert";
import MyChat from "./components/chat/MyChat";
import Profile from "./components/mypage/Profile";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import FindPW from "./components/login/FindPW";
import PageNotForFound from "./components/common/PageNotForFound";
import Chat from "./components/chat/Chat";
import KakaoLogin from "./components/login/KakaoLogin";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              index
              element={
                <MainPage>
                  <AdCarousel />
                </MainPage>
              }
            />

            <Route path="/performance/:category" element={<ConLists />} />
            <Route path="/search/" element={<ConLists />} />
            <Route path="/title/:concert-title/" element={<ConDetail />}>
              <Route index element={<ConInfo />} />
              <Route
                path="/title/:concert-title/chat/"
                element={<ChatList />}
              />
            </Route>
            <Route path="/mypage/" element={<MyPage />}>
              <Route index element={<MyConcert />} />
              <Route path="/mypage/mychat/" element={<MyChat />} />
            </Route>
            <Route path="/profile/" element={<Profile />} />
          </Route>
          <Route path="/chat/" element={<Chat />} />

          <Route path="/kakao-login/" element={<KakaoLogin />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
          <Route path="/findpassword/" element={<FindPW />} />
          <Route path="*" element={<PageNotForFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
