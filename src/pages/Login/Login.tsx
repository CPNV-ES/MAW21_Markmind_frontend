import LoginForm from "@/forms/LoginForm.tsx";
import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSessionStore();

  useEffect(() => {
    if (isAuthenticated()) navigate("/home");
  }, []);

  return (
    <div className={"w-full h-full flex justify-center items-center flex-col"}>
      <LoginForm />
    </div>
  );
}
