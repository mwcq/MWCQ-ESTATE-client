import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>MWCQEstate</span>
        </a>
        {/* <a href="/">首页</a> */}
        {/* <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a> */}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={
                currentUser.avatar ||
                "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>个人信息</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">登录</a>
            <a href="/register" className="register">
              注册
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
