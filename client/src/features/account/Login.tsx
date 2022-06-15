import { FieldValues, useForm } from "react-hook-form";
import FormTextInput from "../../app/components/form/FormTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation/validationSchema";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/store/configureStore";
import { signIn } from "./accountSlice";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../../app/components/LoadingButton";
import { SignIn } from "phosphor-react";
import AuthForm from "../../app/layout/AuthForm";
import { useState } from "react";
import ErrorBox from "../../app/components/ErrorBox";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await dispatch(signIn(data));
      toast.success(`Velkommen ${data.username}`);
      navigate("/inventory");
    } catch (error: any) {
      setLoginError(error.error?.title || "Feil");
    }
  };

  return (
    <AuthForm title="Logg inn">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {loginError && <ErrorBox message={loginError} />}
        <FormTextInput
          focus
          name="username"
          label="Brukernavn"
          placeholder="brukernavn"
          control={control}
        />
        <FormTextInput
          name="password"
          label="Passord"
          type="password"
          placeholder="passord"
          control={control}
        />
        <div className="flex items-end flex-wrap gap-4 justify-between">
          <LoadingButton
            disabled={isSubmitting || !isValid}
            type="submit"
            loading={isSubmitting}
            loadingText="Logger inn..."
            className="h-10 rounded-full"
          >
            <SignIn size="1.5rem" />
            Logg inn
          </LoadingButton>
          <Link
            className="text-xs text-green-wine-500 font-medium underline"
            to="/register"
          >
            Ny bruker? Opprett bruker her.
          </Link>
        </div>
      </form>
    </AuthForm>
  );
};

export default Login;
