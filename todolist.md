# basic Setting

1. create-react-app
   npx create-react-app todolist --template typescript

2. install library

- npm i --save-dev @types/styled-components
- npm i recoil
- npm i react-router-dom@5.3.0

# react-hook-form

1. npm i react-hook-form

```js
import { useForm } from "react-hook-form";
const { register, watch } = useForm();
console.log(register("toDo"));

<form>
  <input {...register("toDo")} placeholder="Write a messgae..." />
  <button>Add</button>
</form>;
```

- register 함수는 `함수를 사용할 때 전달한 매개변수를 name 속성으로 가지며 onBlur이벤트, onChange이벤트, ref 속성을 갖는다.`
  - register 함수가 반환한 객체를 input에 전달한다.
    - 즉, input에 props를 할당한다.
- watch는 사용자가 form의 입력값들의 변화를 관할 찰 수 있게 해주는 함수이다.
  - register로 등록한 name을 키값으로 가지는 객체를 반환한다.
- react-hook-form을 사용하면 form의 input마다 따로 state를 만들어 줄 필요가 없다.

- rect-hook-form의 register 함수를 사용하여 기존의 onChange 이벤트 핸들러를 대체한다.

react-hook-form 사용 전

```js
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To Do should be longer");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          placeholder="Write a messgae..."
        />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}
```

react-hook-form 사용 후

```js
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
```
