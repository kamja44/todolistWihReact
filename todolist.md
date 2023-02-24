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

# 6.8

pattern

- 정규표현식을 사용한다.

pattern에 값을 바로 보내는 경우

```js
<input
  {...register("email", {
    required: true,
    pattern: /^[A-Za-z0-9._%+-]+@naver.com$/,
  })}
  placeholder="Email"
/>
```

pattern에 값을 객체로 보내는 경우

```js
<input
  {...register("email", {
    required: true,
    pattern: /^[A-Za-z0-9._%+-]+@naver.com$/,
  })}
  placeholder="Email"
/>
```

useForm의 기본값 설정하기

```js
const {
  register,
  watch,
  handleSubmit,
  formState: { errors },
} = useForm <
IForm >
{
  defaultValues: {
    email: `@naver.com`,
  },
};
```

# 6.9

setError를 사용하여 직접 에러를 설정
server가 offline이 될 수 있기에 extraError 타입을 지정

```js
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  ConfirmPassword: string;
  extraError ?: string;
}
// setError는 react-hook-form(useForm)에서 제공한다.
const{setError} = useForm<IForm>();
const onValid = (data : IForm) => {
  if(data.password !== data.ConfirmPassword){
    setError("ConfirmPassword",{message : "Password are not the same"}, {shouldFocus : true})
  }
  setError("extraError", {message : "Server offline"})
}
        <input
          {...register("firstName", {
            required: "write here",
              validate: {
              noKamja : (value) =>
              !value.includes("kamja") ? true : " no kamja allowed",
              noKokuma : (value) =>
              !value.includes("kokuma") ? true : " no kokuma allowed",
            }
          })}
          placeholder="First Name"
        />
<span>{errors?.extraError?.message}</span>
// errors가 undefined가 아니면 extraError를 찾고 extraError가 undefined가 아니면 message를 찾는다.
```

- shouldFocus:true는 submit시 ConfirmPassword에서 에러가 발생하면 focus를 ConfirmPassword로 옮겨준다.
- validate는 함수를 값으로 가진다.
  - validate는 인자로 현재 항목에 쓰여지고 있는 값을 받는다.
  - validate의 결과가 true면 firstName은 항상 검사를 통과한다.
  - 위의 코드에선 firstName에 kamja가 들어가면 false를 반환한다. - 즉, kamja는 firstName으로 사용이 불가능하다.
    react-hook-form에서 문자열을 리턴한다면, 에러 메세지를 리턴한다는 뜻이다.
- validate에 여러개의 규칙을 적용시킬 때 객체를 이용하여 여러개의 규칙을 적용시킬 수 있다.
