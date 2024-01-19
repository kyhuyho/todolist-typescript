import { useEffect, useReducer, useRef, useState } from "react";

const Heading = ({ title }: { title: string }) => {
  return <h2 className="font-semibold text-2xl">{title}</h2>;
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
  return (
    <div className="w-[500px] mx-auto mt-[100px]">
      <Heading title="Todo List" />
      <div>
        {todos.length > 0 &&
          todos.map((item: ITodo) => (
            <div className="flex items-center gap-x-2 mt-5" key={item.id}>
              <span>{item.text}</span>
              <button
                className="p-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleRemoveTodo(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
      <div className="flex gap-x-2 mt-5">
        <input
          ref={inputRef}
          type="text"
          className="p-3 border border-slate-400 rounded-lg outline-none"
          placeholder="Enter your text"
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-lg"
          onClick={() => handleAddTodo()}
        >
          Add todo
        </button>
      </div>
    </div>
  );
}

export default App;
