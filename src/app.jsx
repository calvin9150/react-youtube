import { useState, useEffect } from "react";
import "./app.css";
import VideoList from "./components/video_list/video_list";

function App() {
  // videos라는 변수 설정, setVideos로 업뎃가능하게..
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("GOM");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostpopular&maxResult=25&key=AIzaSyBcK6kvYbKH3ymtnDXV4Q-mmsWHrV0vjOY",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []); // 두 번째 인자(배열)가 업데이트 될 때만 이 콜백함수가 호출된다. 빈배열이면 호출이 안되는거지..

  return <VideoList videos={videos} />;
}
export default App;
