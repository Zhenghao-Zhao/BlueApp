import { signIn } from "@/app/_actions";
import SubmitButton from "@/app/_components/ui/buttons/submitButton";
import { signInSchema } from "@/app/_libs/types";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, action] = useFormState(signIn, {
    error: null,
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const isValid = signInSchema.safeParse({ email, password }).success;

  return (
    <div className="w-[450px]">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Sign in</p>
      </div>
      <form action={action} className="flex flex-col gap-2 mt-2" ref={formRef}>
        <label className="mt-2">
          <span>Email</span>
          <input
            type="email"
            value={email}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="email"
            onChange={handleEmailChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Password</span>
          <input
            type="password"
            value={password}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="password"
            onChange={handlePasswordChange}
            autoComplete="on"
          />
        </label>
        <SubmitButton
          title="Submit"
          disabled={!isValid}
          onClick={() => {
            if (!formRef.current) return;
            formRef.current.requestSubmit();
          }}
        />
      </form>
      {formState.error && <p className="text-red-500">{formState.error}</p>}
    </div>
  );
}
