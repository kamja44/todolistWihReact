import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  ConfirmPassword: string;
  extraError?: string;
}
function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: `@naver.com`,
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.ConfirmPassword) {
      setError(
        "ConfirmPassword",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offline" });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noKamja: (value) =>
                !value.includes("kamja") ? true : " no kamja allowed",
              noKokuma: (value) =>
                !value.includes("kokuma") ? true : " no kokuma allowed",
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "write here",
            minLength: 5,
          })}
          placeholder="User Name"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "write here",
            minLength: 5,
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("ConfirmPassword", {
            required: "write here",
            minLength: {
              value: 5,
              message: "Your password is too short!!",
            },
          })}
          placeholder="Confirm Password"
        />
        <span>{errors?.ConfirmPassword?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;
