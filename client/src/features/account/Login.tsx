import { FieldValues, useForm } from "react-hook-form";
import FormTextInput from "../../app/components/form/FormTextInput";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation/validationSchema";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/store/configureStore";
import { signIn } from "./accountSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  useEffect(() => {
    setError("username", {
      types: {
        custom: "this is wrong",
        custom2: "this is also wrong",
      },
    });

    return () => {};
  }, []);

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
    <div>
      <pre>{JSON.stringify(errors, null, 4)}</pre>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-3xl mb-4">Logg inn</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextInput
            name="username"
            label="Brukernavn"
            placeholder="username"
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
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
