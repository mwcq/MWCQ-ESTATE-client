import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "./../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uplodaWidget/UplodaWidget";

function ProfileUpdatePage() {
  const { currentUser, updataUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: handle form submission
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updataUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>修改信息</h1>
          <div className="item">
            <label htmlFor="username">用户名</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">邮箱</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">密码</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>保存</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || ""}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dvnbaigve",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
