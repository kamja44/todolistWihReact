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

# useForm 정리

- react-hook-form
- 모든 기능은 useForm()을 호출한 객체에서 나온다

register 함수는 useForm hook을 사용해서 가져올 수 있다.

- register 함수를 모든 input에서 호출한다.
  - react-hook-form이 알 수 있도록 input의 이름을 줘야 한다.
    - react-hook-form이 data 객체에 input 값을 주고, 에러를 확인할 수 있다.
    - pattern을 이용하여 데이터의 형태를 설정할 수 있다.(정규식)
    - validation을 사용하여 검사 규칙을 설정할 수 있다.
  - react-hook-form은 에러 객체를 제공한다.
    - 개발자가 설정한 규칙과 메세지에 따라 알아서 에러 메시지가 설정된다.

handleSubmit

- useForm hook에서 제공하는 함수이다.
- form태그의 onSubmit 이벤트에 handleSubmit이벤트를 등록해야 한다.
  - 인자는 딱 하나를 받는데 onValid 함수를 받는다.
    - 즉, 첫번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받는다.
    - 데이터가 유효하지 않을 때 호출 될 다른 함수를 2번째 매개변수로 넣을 수 있다.

onValid

- 사용자의 form 데이터가 유효할 때만 호출되는 함수이다. -즉, onValid 함수가 호출되었다면, form이 모든 validation을 통과했고, 모든 input의 입력값들이 다 정상적이고 에러가 없다는 뜻이다.

formState

- useForm hook에서 제공하는 함수이다.
- form의 state가 들어있다.
- 에러 객체가 formState 내부에 존재한다.

errors

- formState의 에러 객체이다.

defaultValues

- defaultValues를 이용하여 기본값을 설정할 수 있다.

setError

- 코드에서 에러를 발생시킬 때 매우 유용하다.
- setError("에러를 발생시킬 항목(에러 발생 위치)", {message : "에러 내용"})

shouldFocus

- 사용자가 form을 submit 할 때 에러를 발생시키면 커서를 해당 input에 focus시켜준다.

setValue

- useForm hook에서 제공한다.
- input태그의 값을 설정할 수 있다.

```js
setValue("toDo", "");
// input태그의 이름이 toDo인 태그의 값을 공백으로 설정한다.
```

# 6.11

recoil의 atom 함수 이용

- atom함수는 고유한 키가 필요하다.
- atom 함수는 기본값을 가질 수 있다.

```js
const toDoState = atom({
  key: "toDo",
  default: [],
});
```

atom 함수의 값에 접근하려면 useRecoilValue 함수를 이용하면된다.

- `useRecoilValue(atom넣어주기);`

```js
const toDoState = atom({
  // toDoState = atom
  key: "toDo",
  default: [],
});

const value = useRecoilValue(toDoState);
// atom(toDoState)의 기본값이 빈 배열이기 때문에, value의 타입은 배열이된다.
```

atom의 값을 변경할 때는 useSetRecoilState 함수를 사용한다.

```js
const modFn = useSetRecoilState(toDoState);
// atom(toDoState)의 값(배열)을 수정할 수 있다.
```

useRecoilState

- 기존에는 useRecoilValue로 atom의 값을 받아오고, useSetRecoilState로 atom의 값을 변경했다.
- useRecoilState 함수를 사용하면 value와 modifier 함수를 반환한다.
  - 반환되는 배열의 첫 번째 항목은 데이터의 value이다.
  - 반환되는 배열의 두 번째 항목은 value를 변경하기 위해 사용되는 함수이다.
- `const [value, modifier] = useRecoilState(atom 넣어주기);`

```js
const [value, modFn] = useRecoilState(toDoState);
```

즉, 위의 코드는 아래와 동일하게 동작한다.

```js
const value = useRecoilValue(toDoState);
const modFn = useSetRecoilState(toDoState);
```

```js
const [toDos, setToDos] = useRecoilState(toDoState);
```

위의 코드에서 toDos의 타입은 never타입으로 배열에 아무값도 들어갈 수 없다.

- TS를 이용하여 타입을 변경한다.

```js
interface IForm {
  toDo: string;
  category: "TO_DO" | "DOING" | "DONE";
}
// toDo는 string 타입
// category는 TO_DO, DOING, DONE 3가지 문자열 중 하나만 가질 수 있다.

const toDoState = atom<IToDo[]>({ // atom은 IToDo[]타입임을 명시한다.
  key: "toDo",
  default: [],
});
```

setToDos 함수를 이용하여 이전의 state를 oldToDos로 받아서 배열을 반환한다.

```js
setToDos((oldToDos) => [...oldToDos]);
```

- 반환받은 배열은 oldToDos의 모든 요소를 갖는다.

  6.13

argument가 있는 event 처리 방법 1

```js
function ToDo({ text, category }: IToDo) {
  const onClick = (newCategory: IToDo["category"]) => {};
  //IToDo["category"]를 사용함으로써 newCategory의 타입이 IToDo interface의 category 항목임을 알려준다.
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      // () => onClick("DOING")이런 식으로 작성하면 JS 엔진이 함수를 실행하여
      인자를 넘긴다.
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}
```

argument가 있는 event 처리 방법 2

```js
function ToDo({ text, category }: IToDo) {
  const onClick = (event : React.MouseEvent<HTMLButtonElement) => {
    // html의 name을 event를 통해 받아올 수 있다.
    console.log(`I want ${event.currentTarget.value}`);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name = "DOING" onClick={onClick}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button name = "TO_DO" onClick={onClick}>To Do</button>
      )}
      {category !== "DONE" && (
        <button name = "DONE" onClick={onClick}>Done</button>
      )}
    </li>
  );
}
```

# 6.14

JS

- findIndex
  - 조건을 만족하는 todo의 Index를 찾는다.
