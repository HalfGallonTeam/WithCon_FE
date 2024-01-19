import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/styles.css";
import Home from "./components/common/Home";
import MainPage from "./components/concert/MainPage";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<MainPage />} />
          <Route path="/:category/" element={<ConLists />} />
          <Route path="/:search/" element={<ConLists />} />

          <Route path="/:concert-title/" element={<ConDetail />}>
            <Route index element={<ConInfo />} />
            <Route path="/:concert-title/chat/" element={<ChatList />} />
          </Route>

          <Route path="/mypage/" element={<MyPage />}>
            <Route index element={<MyConcert />} />
            <Route path="/mypage/mychat/" element={<MyChat />} />
          </Route>
          <Route path="/profile/" element={<Profile />} />
        </Route>

        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/findpassword/" element={<FindPW />} />

        <Route path="*" element={<PageNotForFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
