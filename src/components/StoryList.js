import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function StoryList() {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "stories"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sorted = data.sort((a, b) => {
        const aDate = a.createdAt?.toDate?.() ?? new Date(0);
        const bDate = b.createdAt?.toDate?.() ?? new Date(0);
        return bDate - aDate;
      });

      setStories(sorted);
    } catch (error) {
      toast.error(t("fetch_error"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete"))) {
      try {
        await deleteDoc(doc(db, "stories", id));
        setStories((prev) => prev.filter((story) => story.id !== id));
        toast.success(t("story_deleted"));
      } catch (error) {
        toast.error(t("delete_failed"));
      }
    }
  };

  const handleLike = async (id, currentLikes = 0) => {
    try {
      await updateDoc(doc(db, "stories", id), {
        likes: currentLikes + 1,
      });

      setStories((prev) =>
        prev.map((story) =>
          story.id === id ? { ...story, likes: (story.likes || 0) + 1 } : story
        )
      );
    } catch (error) {
      toast.error(t("like_failed"));
    }
  };

  const filteredStories = stories.filter((story) =>
    story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      <h2 style={{ color: "var(--color-accent)" }}>{t("your_stories")}</h2>

      <input
        type="text"
        placeholder={t("search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "0.8rem",
          marginBottom: "1.5rem",
          border: "1px solid var(--color-border)",
          borderRadius: "6px",
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      />

      {filteredStories.length === 0 ? (
        <p>{t("no_match")}</p>
      ) : (
        filteredStories.map((story) => (
          <div key={story.id} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.content.slice(0, 100)}...</p>
            <p style={{ fontSize: "0.9rem", color: "gray" }}>
              🕓 {story.createdAt?.toDate?.().toLocaleDateString(i18n.language === "en" ? "en-US" : "ar-SY", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
            <p style={{ marginBottom: "0.5rem", color: "gray" }}>
              ❤️ {t("likes_count")}: {story.likes || 0}
            </p>
            <div>
              <Link to={`/story/${story.id}`} className="read-btn">{t("read")}</Link>
              <button onClick={() => handleLike(story.id, story.likes)} className="like-btn">❤️ {t("like")}</button>
              <Link to={`/edit/${story.id}`} className="edit-btn">✏️ {t("edit")}</Link>
              <button onClick={() => handleDelete(story.id)} className="delete-btn">🗑️ {t("delete")}</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default StoryList;