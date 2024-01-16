import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ConLists from "./components/ConLists";
import ConDetail from "./components/ConDetail";
import ConInfo from "./components/ConInfo";
import ChatList from "./components/ChatList";
import MyPage from "./components/Mypage";
import MyConcert from "./components/MyConcert";
import MyChat from "./components/MyChat";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Membership from "./components/Membership";
import FindPW from "./components/FindPW";
import PageNotForFound from "./components/PageNotForFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<ConLists />} />
          <Route path="/:category/" element={<ConLists />} />
          <Route path="/:search/" element={<ConLists />} />

          <Route path="/:concert-title/" element={<ConDetail />}>
            <Route index element={<ConInfo />} />
            <Route path="/:concert-title/chat/" element={<ChatList />} />
          </Route>

          <Route path="/mypage/" element={<MyPage />}>
            <Route index element={<MyConcert />} />
            <Route path="/mypage/mychat/" element={<MyChat />} />
            <Route path="/mypage/profile/" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/login/" element={<Login />} />
        <Route path="/membership/" element={<Membership />} />
        <Route path="/findpassword/" element={<FindPW />} />

        <Route path="*" element={<PageNotForFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
