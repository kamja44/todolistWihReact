import { useState } from "react";
import { useForm } from "react-hook-form";
function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  console.log(watch());
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("firstName", { required: true, minLength: 5 })}
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true, minLength: 5 })}
          placeholder="Last Name"
        />
        <input
          {...register("userName", {
            required: true,
            minLength: 5,
          })}
          placeholder="User Name"
        />
        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 5,
              message: "Your password is too shor!!!",
            },
          })}
          placeholder="Password"
        />
        <input
          {...register("ConfirmPassword", {
            required: "confirm password is required",

            minLength: {
              value: 5,
              message: "Your password is too shor!!!",
            },
          })}
          placeholder="Confirm Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
