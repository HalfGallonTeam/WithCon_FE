import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import instance from "./assets/constants/instance";
import "./assets/css/styles.css";

import ScrollToTop from "./components/common/ScrollToTop";
import MainPage from "./components/concert/MainPage";
import ConLists from "./components/concert/ConLists";
import ConDetail from "./components/concert/ConDetail";
import ConInfo from "./components/concert/ConInfo";
import ChatList from "./components/chat/ChatList";
import MyPage from "./components/mypage/Mypage";
import MyConcert from "./components/mypage/MyConcert";
import MyChat from "./components/chat/MyChat";
import Profile from "./components/mypage/Profile";
import PageNotForFound from "./components/common/PageNotForFound";

import KakaoLogin from "./components/login/KakaoLogin";
import NaverLogin from "./components/login/NaverLogin";
import ChangePW from "./components/mypage/ChangePW";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ChatPage from "./components/pages/ChatPage";
import FindPwPage from "./components/pages/FindPwPage";

function App() {
  let loading = false;
  useEffect(() => {
    const getUserdata = async () => {
      if (!loading) return;
      loading = true;
      try {
        const response = await instance.get("/member/me");
        sessionStorage.setItem("userdata", JSON.stringify(response.data));
        const response2 = await instance.get("/performance/favorite-id");
        sessionStorage.setItem("favorites", JSON.stringify(response2.data));
      } catch (error) {
        console.error(error, "에러");
      }
    };

    getUserdata();
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<MainPage />} />
            <Route path="/performance/" element={<ConLists />} />
            <Route path="/performance/search/" element={<ConLists />} />
            <Route path="/title/:concertTitle/" element={<ConDetail />}>
              <Route index element={<ConInfo />} />
              <Route path="/title/:concertTitle/chat/" element={<ChatList />} />
            </Route>
            <Route path="/mypage/" element={<MyPage />}>
              <Route index element={<MyConcert />} />
              <Route path="/mypage/mychat/" element={<MyChat />} />
            </Route>
            <Route path="/profile/">
              <Route index element={<Profile />} />
              <Route path="/profile/changepassword/" element={<ChangePW />} />
            </Route>
          </Route>
          <Route
            path="/title/:concertTitle/chat/:chatRoomId"
            element={<ChatPage />}
          />

          <Route path="/login/" element={<LoginPage />} />
          <Route path="/kakao-login/" element={<KakaoLogin />} />
          <Route path="/naver-login/" element={<NaverLogin />} />
          <Route path="/signup/" element={<SignupPage />} />
          <Route path="/findpassword/" element={<FindPwPage />} />
          <Route path="*" element={<PageNotForFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
