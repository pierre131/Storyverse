import React from "react";
import AddStory from "../components/AddStory";
import StoryList from "../components/StoryList";

function Home() {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>📚 Storyverse</h1>
      <AddStory />
      <hr />
      <StoryList />
    </div>
  );
}

export default Home;