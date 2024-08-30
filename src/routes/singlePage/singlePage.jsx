import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPirofy from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import apiRequest from "./../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  console.log(post);
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    if (!currentUser) {
      redirect("/login");
    }
    setSaved(!saved);

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved(!saved);
    }
  };

  const seedChat = async () => {
    const res = await apiRequest.post("/chats/", {
      receiverId: post.userId,
      tite: post.title,
    });
    console.log(res);
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPirofy.sanitize(post.PostDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">基本信息</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>公用设施政策</span>
                {post.PostDetail.utilities === "owner" ? (
                  <p>业主负责</p>
                ) : post.PostDetail.utilities === "tenant" ? (
                  <p>租户负责</p>
                ) : (
                  <p>分摊</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>是否接受宠物</span>
                {post.PostDetail.pet === "allowed" ? (
                  <p>接受</p>
                ) : (
                  <p>不接受</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>条件</span>
                <p>{post.PostDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">房屋信息</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.PostDetail.size}平方米</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}卧室</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bedroom}浴室</span>
            </div>
          </div>
          <p className="title">周边信息</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>附近学校</span>
                <p>
                  {post.PostDetail.school > 999
                    ? (post.PostDetail.school / 1000).toFixed(1) + "千米"
                    : post.PostDetail.school + "米"}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>公交站/地铁站</span>
                <p>
                  {post.PostDetail.bus > 999
                    ? post.PostDetail.bus / 1000 + "千"
                    : post.PostDetail.bus}{" "}
                  米
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>附近餐厅</span>
                <p>
                  {post.PostDetail.restaurant > 999
                    ? post.PostDetail.restaurant / 1000 + "千"
                    : post.PostDetail.restaurant}{" "}
                  米
                </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={seedChat}>
              <img src="/chat.png" alt="" />
              发送消息
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "取消收藏" : "收藏房屋"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
