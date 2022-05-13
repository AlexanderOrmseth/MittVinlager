import { FieldValues, useForm } from "react-hook-form";
import FormTextInput from "../../app/components/form/FormTextInput";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validation/validationSchema";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/store/configureStore";
import { signIn } from "./accountSlice";
import { useNavigate } from "react-router-dom";
import api from "../../app/api";

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
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-3xl mb-4">Opprett bruker</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextInput
            name="username"
            label="Brukernavn"
            placeholder="username"
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
            placeholder="password"
            control={control}
          />
          <div className="flex items-center justify-between">
            <button
              disabled={isSubmitting || !isValid}
              className="bg-wine1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              Opprett bruker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
