/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer, useRef, useState } from "react";

const Heading = ({ title }: { title: string }) => {
  return <h2 className="text-2xl font-semibold">{title}</h2>;
};
type TypeAction =
  | {
      type: "ADD";
      text: string;
    }
  | {
      type: "REMOVE";
      id: number;
    };
interface ITodo {
  id: number;
  text: string;
}
interface IData {
  id: number;
  text: string;
}
const todoReducer = (state: ITodo[], action: TypeAction) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: state.length,
          text: action.text,
        },
      ];
    case "REMOVE":
      return state.filter((todo: ITodo) => todo.id !== action.id);
    default:
      throw new Error("Error");
  }
};
const initialState: ITodo[] = [];
function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddTodo = () => {
    if (inputRef.current) {
      dispatch({
        type: "ADD",
        text: inputRef.current?.value,
      });
      inputRef.current.value = "";
    }
  };
  const handleRemoveTodo = (todoId: number) => {
    dispatch({
      type: "REMOVE",
      id: todoId,
    });
  };
  const [data, setData] = useState<IData | null>(null);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((rs) => setData(rs));
  }, []);
  const onClickItem = (item: string) => {
    alert(item);
  };
  return (
    <div className="w-[500px] mx-auto mt-[100px]">
      <Heading title="Todo List" />
      <List
        items={["HTML", "CSS", "JS", "TS", "React"]}
        onClickItem={onClickItem}
      />
      <Boxed>Component Boxed</Boxed>
      <div>
        {todos.length > 0 &&
          todos.map((item: ITodo) => (
            <div className="flex items-center mt-5 gap-x-2" key={item.id}>
              <span>{item.text}</span>
              <button
                className="p-2 text-white bg-red-500 rounded-lg"
                onClick={() => handleRemoveTodo(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
      <div className="flex mt-5 gap-x-2">
        <input
          ref={inputRef}
          type="text"
          className="p-3 border rounded-lg outline-none border-slate-400"
          placeholder="Enter your text"
        />
        <button
          className="p-3 text-white bg-blue-500 rounded-lg"
          onClick={() => handleAddTodo()}
        >
          Add todo
        </button>
      </div>
    </div>
  );
}

const List = ({
  items,
  onClickItem = () => {},
}: {
  items: string[];
  onClickItem: (item: string) => void;
}) => {
  return (
    <div>
      {items?.map((item, index) => (
        <div
          onClick={() => onClickItem(item)}
          key={index}
          className="cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const Boxed = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
export default App;
