import { FieldValues, useForm } from "react-hook-form";
import FormTextInput from "../../app/components/form/FormTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validation/validationSchema";
import { useAppDispatch } from "../../app/store/configureStore";
import { register } from "./accountSlice";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../app/layout/AuthForm";
import LoadingButton from "../../app/components/LoadingButton";
import { UserPlus } from "phosphor-react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await dispatch(register(data));
      navigate("/inventory");
    } catch (error) {
      const err = error as { keyName: string }[];
      for (const [key, value] of Object.entries(err)) {
        let fieldName = "custom";
        if (key.includes("Name")) fieldName = "username";
        else if (key.toLowerCase().includes("email")) fieldName = "email";
        else if (key.toLocaleLowerCase().includes("password"))
          fieldName = "password";
        setError(fieldName, {
          types: { ...value },
        });
      }
    }
  };

  return (
    <AuthForm title="Opprett bruker">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="username"
          label="Brukernavn"
          focus
          placeholder="brukernavn"
          control={control}
        />
        <FormTextInput
          name="email"
          label="E-postaddresse"
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
        <FormTextInput
          name="passwordConfirmation"
          label="Bekreft passord"
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
