import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function StoryDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(db, "stories", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setStory(snap.data());
        } else {
          toast.error(t("story_not_found"));
        }
      } catch (error) {
        toast.error(t("fetch_error"));
      }
    };

    fetchStory();
  }, [id, t]);

  if (!story) return <p>{t("loading")}</p>;

  return (
    <div className="story-card">
      <h2>{story.title}</h2>
      <p>{story.content}</p>
      <p style={{ fontSize: "0.9rem", color: "gray" }}>
        🕓 {story.createdAt?.toDate?.().toLocaleDateString("ar-SY", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </p>
      <p>❤️ {t("likes_count")}: {story.likes || 0}</p>
    </div>
  );
}

export default StoryDetails;