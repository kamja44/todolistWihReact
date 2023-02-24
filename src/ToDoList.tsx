import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>(); // 모든 기능은 useForm()을 호출한 객체에서 나온다
  const onSubmit = (data: IForm) => {
    // onSubmit 함수는 사용자가 직접 호출한다.
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="write a to do"
        />
        {/* register에서 등록한 input의 이름은 toDo가 그대로 onSubmit 함수의 data에 들어간다. */}
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
