import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uplodaWidget/UplodaWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: handle form submission
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    console.log("formValues", formValues);
    console.log("value", value);

    try {
      // console.log("?");
      const res = await apiRequest.post("/posts", {
        postData: {
          title: formValues.title,
          price: parseInt(formValues.price),
          address: formValues.address,
          city: formValues.city,
          bedroom: parseInt(formValues.bedroom),
          bathroom: parseInt(formValues.bathroom),
          type: formValues.type,
          property: formValues.property,
          latitude: formValues.latitude,
          longitude: formValues.longitude,
          images,
        },
        postDetail: {
          desc: value,
          utilities: formValues.utilities,
          pet: formValues.pet,
          size: parseInt(formValues.size),
          income: formValues.income,
          bus: parseInt(formValues.bus),
          school: parseInt(formValues.school),
          restaurant: parseInt(formValues.restaurant),
        },
      });
      navigate(`/${res.data.id}`);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>发布信息</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">标题</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">价格</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">地址</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">描述</label>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
            <div className="item">
              <label htmlFor="city">城市</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">卧室数量</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">浴室/卫生间数量</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">纬度</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">精度</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">类型</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  出租
                </option>
                <option value="buy">出卖</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">类型</label>
              <select name="property">
                <option value="apartment">公寓</option>
                <option value="house">独栋房屋</option>
                <option value="condo">社区房</option>
                <option value="land">土地</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">公用设施政策</label>
              <select name="utilities">
                <option value="owner">业主负责</option>
                <option value="tenant">租户负责</option>
                <option value="shared">分摊</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">接受宠物</label>
              <select name="pet">
                <option value="allowed">接受</option>
                <option value="not-allowed">不接受</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">条件</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="押一付一"
              />
            </div>
            <div className="item">
              <label htmlFor="size">面积</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">附近学校</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">附近公交站</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">附近餐厅</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">发布</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="imagesContainer">
          {images.map((item, i) => {
            return (
              <>
                <img src={item} key={i} alt="" />
              </>
            );
          })}
        </div>
        <UploadWidget
          uwConfig={{
            multipe: true,
            cloudName: "dvnbaigve",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
