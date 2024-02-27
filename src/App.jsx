import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { myInfoState } from "./assets/constants/userRecoilState";
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

import WebSocket from "./components/common/WebSocket";

function App() {
  let loading = false;
  const setMyinfo = useSetRecoilState(myInfoState);

  useEffect(() => {
    const getUserdata = async () => {
      if (loading) return;
      loading = true;
      const token = localStorage.getItem("withcon_token");
      if (!token) return;
      const savedUserdata = JSON.parse(
        sessionStorage.getItem("userdata")
      )?.myInfo;
      if (savedUserdata) {
        setMyinfo(savedUserdata);
        return;
      }

      try {
        const response = await instance.get("/member/me");
        setMyinfo(response.data);
      } catch (error) {
        console.error(error, "에러");
      }
    };

    getUserdata();
  }, []);

  return (
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
        <Route path="/chat-room/:chatRoomId" element={<ChatPage />} />

        <Route path="/websocket" element={<WebSocket />} />

        <Route path="/login/" element={<LoginPage />} />
        <Route path="/kakao-login/" element={<KakaoLogin />} />
        <Route path="/naver-login/" element={<NaverLogin />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/findpassword/" element={<FindPwPage />} />
        <Route path="*" element={<PageNotForFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
