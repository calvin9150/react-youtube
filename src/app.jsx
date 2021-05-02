import { useState, useEffect } from "react";
import styles from "./app.module.css";
import SearchHeader from "./components/search_header/search_header";
import VideoList from "./components/video_list/video_list";

function App() {
  // videos라는 변수 설정, setVideos로 업뎃가능하게..
  const [videos, setVideos] = useState([]);
  const search = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=AIzaSyBcK6kvYbKH3ymtnDXV4Q-mmsWHrV0vjOY`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        result.items.map((item) => ({ ...item, id: item.id.videoId }))
      )
      .then((items) => setVideos(items))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostpopular&maxResults=20&key=AIzaSyBcK6kvYbKH3ymtnDXV4Q-mmsWHrV0vjOY",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []); // 두 번째 인자(배열)가 업데이트 될 때만 이 콜백함수가 호출된다. 빈배열이면 호출이 안되는거지..

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}
export default App;
