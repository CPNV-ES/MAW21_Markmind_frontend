import AuthRepository from "@/repositories/authRepository.ts";
import { useSessionStore } from "@/stores/useSessionStore.ts";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { setSession } = useSessionStore();
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => await AuthRepository.login(data),
    onSuccess: (data) => {
      setSession(data);
      navigate("/home");
    },
    onError: () => setLoginFormData((data) => ({ ...data, password: "" })),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginFormData);
  };

  const isDisabled =
    loginMutation.isLoading ||
    loginFormData.email === "" ||
    loginFormData.password === "";

  return (
    <form
      className="flex flex-col w-full max-w-md gap-4 p-6 mx-auto bg-white rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl">Se connecter</h1>
      <div className="flex flex-col">
        {loginMutation.isError && (
          <p className="mb-2 text-sm text-red-600">
            Adresse email ou mot de passe invalide
          </p>
        )}
        <label
          htmlFor="email"
          className="mb-1 text-sm font-medium text-gray-600"
        >
          Email:{" "}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          value={loginFormData.email}
          onChange={(e: ChangeEvent) =>
            setLoginFormData((formData) => ({
              ...formData,
              email: (e.target as HTMLInputElement).value,
            }))
          }
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-1 text-sm font-medium text-gray-600"
        >
          Mot de passe:{" "}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          value={loginFormData.password}
          onChange={(e: ChangeEvent) =>
            setLoginFormData((formData) => ({
              ...formData,
              password: (e.target as HTMLInputElement).value,
            }))
          }
        />
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Se connecter
      </button>
    </form>
  );
}
