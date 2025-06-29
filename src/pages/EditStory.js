import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function EditStory() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(db, "stories", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setStory(snap.data());
        } else {
          toast.error(t("story_not_found"));
          navigate("/");
        }
      } catch (error) {
        toast.error(t("fetch_error"));
      }
    };

    fetchStory();
  }, [id, navigate, t]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!story.title.trim() || !story.content.trim()) {
      return toast.warn(t("fill_fields"));
    }

    try {
      const docRef = doc(db, "stories", id);
      await updateDoc(docRef, {
        title: story.title,
        content: story.content,
      });

      toast.success(t("story_updated"));
      navigate("/");
    } catch (error) {
      toast.error(t("update_error"));
    }
  };

  return (
    <div className="story-form">
      <h3>{t("edit_story")}</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={story.title}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
          placeholder={t("title")}
        />
        <textarea
          rows={5}
          value={story.content}
          onChange={(e) => setStory({ ...story, content: e.target.value })}
          placeholder={t("content")}
        />
        <button type="submit">{t("save_changes")}</button>
      </form>
    </div>
  );
}

export default EditStory;