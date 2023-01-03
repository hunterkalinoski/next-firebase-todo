"use client";

import Link from "next/link";
import { useAuthState } from "@hooks/useAuthState";
import { deleteTodo, getCurrentUserDoc, getCurrentUserTodos } from "@lib/database";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";

export default function Page() {
  const [auth] = useAuthState();
  const [authFetched, setAuthFetched] = useState(0);
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null);
  const [todos, setTodos] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    getCurrentUserDoc().then((userDoc) => {
      setUserDoc(userDoc);
    });
    getCurrentUserTodos().then((data) => {
      setTodos(data);
    });
    setAuthFetched(authFetched + 1);
  }, [auth]);

  const finishTodo = async (todoId: string) => {
    const success = await deleteTodo(todoId);
    if (!success) {
      alert("failed to delete that todo...");
    }
    // update todos (rerender)
    let newTodos = todos?.filter((e) => e.id !== todoId);
    setTodos(newTodos ?? null);
  };

  return (
    <>
      {auth && userDoc ? (
        <>
          <h2>Hello {userDoc?.display_name}</h2>
          <Link href="/create">
            <button>Create a new Todo</button>
          </Link>
          <h1 className="mt-20">Your Todos:</h1>
          <ul className="flex flex-col gap-4">
            {todos?.map((todo) => (
              <li
                key={todo.id}
                className={`border border-white rounded-lg p-2.5 w-[35rem] flex flex-col items-center justify-center`}
                style={{ backgroundColor: todo.data().color }}
              >
                <span
                  className="w-full grid grid-cols-3"
                  style={{ backgroundColor: todo.data().color }}
                >
                  {/* creates 3 grid items, so h2 is centered and button on right */}
                  <p style={{ backgroundColor: todo.data().color }}> </p>
                  <h2
                    className="justify-self-center"
                    style={{ backgroundColor: todo.data().color }}
                  >
                    {todo.data().title}
                  </h2>
                  <button
                    className="justify-self-end hover:bg-opacity-40   "
                    onClick={(_) => finishTodo(todo.id)}
                  >
                    Complete
                  </button>
                </span>
                <p style={{ backgroundColor: todo.data().color }}>
                  {todo.data().description.substring(0, 100) + "..."}
                </p>
              </li>
            ))}
          </ul>
          <p className="pb-10"></p>
        </>
      ) : authFetched > 2 ? (
        <>
          <h1>Welcome to Next-Firebase todos</h1>
          <p>This is a todo app built with Nextjs and Firebase(Auth and Firestore)</p>
          <span className="flex flex-row gap-2 items-center">
            <Link href="/signup">
              <button>Sign up</button>
            </Link>
            <p>or</p>
            <Link href="/signin">
              <button>Sign in</button>
            </Link>
            <p>to get started</p>
          </span>
        </>
      ) : (
        <>
          <TailSpin
            height="80"
            width="80"
            color="#334155"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </>
      )}
    </>
  );
}
