import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  // enum은 기본적으로 값을 숫자로 기억한다.
  // 즉, "TO_DO" = "TO_DO"를 함으로써 TO_DO를 숫자가 아닌 TO_DO로 지정한다.
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});
const { persistAtom } = recoilPersist({
  key: "todoLocal", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom], // Please add effects_UNSTABLE key to atom definition
});
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
