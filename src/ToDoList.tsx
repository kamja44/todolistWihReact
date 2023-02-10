import { useState } from "react";
import { useForm } from "react-hook-form";
function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="Write a messgae..." />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
