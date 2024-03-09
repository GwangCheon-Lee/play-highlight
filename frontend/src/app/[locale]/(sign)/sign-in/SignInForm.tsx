"use client";
import styles from "../sign.module.scss";
import { useForm } from "react-hook-form";
import SignInput from "../SignInput";
import Logo from "@/components/common/Logo";
import { SignInBody } from "@/types/auth/authTypes";
import { parseJwt } from "@/utils/constants";
import { signIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/selectors";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { fetchSignIn } from "@/services/auth/authService";
import { extractAxiosErrorDetails } from "@/utils/axiosError";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const { showModal } = useModal();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInBody>();

  const onSubmit = async (formData: SignInBody) => {
    try {
      const { accessToken } = await fetchSignIn(formData);
      const { user } = parseJwt(accessToken);
      sessionStorage.setItem("accessToken", accessToken);
      dispatch(signIn({ user: user }));
      router.push("/");
    } catch (e) {
      const errorDetails = extractAxiosErrorDetails(e);
      showModal(null, errorDetails.errorMessage, false);
    }
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <SignInput
        register={register}
        validation={{
          required: "Required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            message: "It's not in the form of an email.",
          },
        }}
        name="email"
        type="text"
        placeholder="Enter your email"
        title="Email"
      />
      {errors.email && (
        <p className={styles.errorText}>{errors?.email?.message}</p>
      )}
      <SignInput
        register={register}
        validation={{ required: "Required." }}
        name="password"
        type="password"
        placeholder="Enter your password"
        title="Password"
      />
      <button className={styles.signInButton} type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
