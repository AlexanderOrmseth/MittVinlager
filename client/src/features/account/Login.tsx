import { FieldValues, useForm } from "react-hook-form";
import FormTextInput from "../../app/components/form/FormTextInput";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation/validationSchema";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/store/configureStore";
import { signIn } from "./accountSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingButton from "../../app/components/LoadingButton";
import { Lock, LockKey, SignIn } from "phosphor-react";
import AuthForm from "../../app/layout/AuthForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      const res = await dispatch(signIn(data));
      toast.success(`Velkommen ${data.username}`);
      navigate("/");
      console.log(res);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <AuthForm title="Logg inn">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
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
