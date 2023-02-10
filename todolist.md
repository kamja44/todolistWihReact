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

# 6.7

useForm()의 handleSubmit

- handleSubmit은 2가지 argument를 받는다.
  - 첫 번째 argument는 데이터가 유효할 때 호출되는 함수이다.(필수)
  - 두 번째 argument는 데이터가 유효하지 않을 때 호출되는 함수이다.[선택]
  - 기존의 onSubmit 함수 대체

```js
const onValid = (data: any) => {
  console.log(data);
};
<form onSubmit={handleSubmit(onValid)}></form>;
```

useForm()의 formState

- handleSubmit의 오류제어를 도와준다.
  - 즉, error를 자동으로 처리한다.

```js
const { register, watch, handleSubmit, formState } = useForm();
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
          minLength: {
            value: 5,
            message: "Your password is too short!!!",
          },
        })}
        placeholder="User Name"
      />
      <input
        {...register("password", {
          required: true,
          minLength: {
            value: 5,
            message: "Your password is too short!!!",
          },
        })}
        placeholder="Password"
      />
      <input
        {...register("ConfirmPassword", {
          required: "confirm password is required",
          minLength: 5,
        })}
        placeholder="Confirm Password"
      />
      <button>Add</button>
    </form>
  </div>
);
// error 발생 시 어느 부분에서 에러가 발생했는지, 에러메시지를 보여준다.
```
