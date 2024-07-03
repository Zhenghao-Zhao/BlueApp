"use client";
import { signUp } from "@/app/_actions";
import SubmitButton from "@/app/_components/ui/buttons/submitButton";
import { signUpSchema } from "@/app/_libs/types";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { VerificationForm } from "../verificationForm";

export type SignUpInfo = {
  email: string;
  password: string;
  username: string;
  name: string;
};

export function SignUpForm() {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [formState, action] = useFormState(signUp, {
    error: null,
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSignUpInfo({
      ...signUpInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const isValid = signUpSchema.safeParse({
    email: signUpInfo.email,
    password: signUpInfo.password,
    username: signUpInfo.username,
    name: signUpInfo.name,
  }).success;

  if (formState.message === "Success")
    return <VerificationForm email={signUpInfo.email} />;

  return (
    <div className="w-[450px]">
      <div className="flex items-center justify-between">
        <p className="text-[25px]">Sign up</p>
      </div>
      <form action={action} className="flex flex-col gap-2 mt-2" ref={formRef}>
        <label className="mt-2">
          <span>Username</span>
          <input
            value={signUpInfo.username}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="username"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Name</span>
          <input
            value={signUpInfo.name}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="name"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Email</span>
          <input
            type="email"
            value={signUpInfo.email}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="email"
            onChange={handleChange}
            autoComplete="on"
          />
        </label>
        <label className="mt-2">
          <span>Password</span>
          <input
            type="password"
            value={signUpInfo.password}
            className="bg-btn-primary w-full p-2 rounded-md"
            name="password"
            onChange={handleChange}
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
