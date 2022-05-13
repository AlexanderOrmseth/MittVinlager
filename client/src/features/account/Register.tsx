import { FieldValues, useForm } from "react-hook-form";
import FormTextInput from "../../app/components/form/FormTextInput";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validation/validationSchema";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/store/configureStore";
import { signIn } from "./accountSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../../app/api";
import AuthForm from "../../app/layout/AuthForm";
import LoadingButton from "../../app/components/LoadingButton";
import { UserPlus } from "phosphor-react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      const res = await api.Account.register(data);
      toast.success(`Bruker opprettet`);
      navigate("/register");
      console.log(res);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <AuthForm title="Opprett bruker">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="username"
          label="Brukernavn"
          placeholder="brukernavn"
          control={control}
        />
        <FormTextInput
          name="email"
          label="Email"
          type="email"
          placeholder="email"
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
            <UserPlus size="1.5rem" />
            Opprett bruker
          </LoadingButton>
          <Link
            className="text-xs text-green-wine-500 font-medium underline"
            to="/login"
          >
            Allerede bruker? Logg inn her.
          </Link>
        </div>
      </form>
    </AuthForm>
  );
};

export default Register;
