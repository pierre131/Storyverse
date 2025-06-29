import React, { useState } from "react";
import { db, auth } from "../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function AddStory() {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return toast.warn(t("fill_fields"));
    }

    try {
      await addDoc(collection(db, "stories"), {
        title,
        content,
        createdAt: serverTimestamp(),
        likes: 0,
        uid: auth.currentUser.uid,
      });

      toast.success(t("story_published"));
      setTitle("");
      setContent("");
    } catch (error) {
      toast.error(t("publish_error"));
    }
  };

  return (
    <div className="story-form">
      <h3>{t("write_story")}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t("title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={5}
          placeholder={t("content")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">{t("publish")}</button>
      </form>
    </div>
  );
}

export default AddStory;