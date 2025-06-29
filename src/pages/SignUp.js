import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("🔒 كلمة المرور يجب أن تكون 6 أحرف أو أكثر");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("🎉 تم إنشاء الحساب!");
      navigate("/");
    } catch (error) {
      toast.error("🚫 هذا البريد مسجّل بالفعل أو غير صالح");
    }
  };

  return (
    <form onSubmit={handleSignUp} style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>📝 إنشاء حساب جديد</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button type="submit" style={{ width: "100%" }}>تسجيل</button>
    </form>
  );
}

export default SignUp;