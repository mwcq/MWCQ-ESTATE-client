import { Suspense, useContext, useEffect, useState } from "react";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const [isLoding, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updataUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("auth/logout");
      updataUser(null);
      navigate("/");
    } catch (error) {
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>个人信息</h1>
            <Link to={"/profile/update"}>
              <button>修改信息</button>
            </Link>
          </div>
          <div className="info">
            <span>
              头像:
              <img
                src={
                  currentUser.avatar ||
                  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt=""
              />
            </span>
            <span>
              昵称: <b>{currentUser.username}</b>
            </span>
            <span>
              邮箱: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout} disabled={isLoding}>
              退出登录
            </button>
          </div>
          <div className="title">
            <h1>我发布的</h1>
            <Link to={"/add"}>
              <button>发布信息</button>
            </Link>
          </div>
          <Suspense fallback={<p>加载中....</p>}>
            <Await resolve={data.postResponse} errorElement={<p>加载失败</p>}>
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>我的收藏</h1>
          </div>
          <Suspense fallback={<p>加载中....</p>}>
            <Await resolve={data.postResponse} errorElement={<p>加载失败</p>}>
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
          {/* <List /> */}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>加载中....</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>加载失败</p>}>
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
