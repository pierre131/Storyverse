import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ تسجيل الدخول ناجح!");
      navigate("/");
    } catch (error) {
      toast.error("❌ البريد أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>🔐 تسجيل الدخول</h2>
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
      <button type="submit" style={{ width: "100%" }}>تسجيل الدخول</button>
    </form>
  );
}

export default SignIn;