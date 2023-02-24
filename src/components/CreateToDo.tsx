import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";
interface IForm {
  toDo: string;
  category: "TO_DO" | "DOING" | "DONE";
}
function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // 모든 기능은 useForm()을 호출한 객체에서 나온다
  const setToDos = useSetRecoilState(toDoState);
  const onSubmit = ({ toDo }: IForm) => {
    // onSubmit 함수는 사용자가 직접 호출한다.
    setToDos((oldToDos) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="write a to do"
      />
      {/* register에서 등록한 input의 이름은 toDo가 그대로 onSubmit 함수의 data({toDo})에 들어간다. */}
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
