"use client";

import Link from "next/link";
import { useAuthState } from "@hooks/useAuthState";
import { logOutUser } from "@lib/auth";
import { deleteTodo, getCurrentUserDoc, getCurrentUserTodos } from "@lib/database";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

export default function Page() {
  const [auth] = useAuthState();
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null);
  const [todos, setTodos] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    getCurrentUserDoc().then((userDoc) => {
      setUserDoc(userDoc);
    });
    getCurrentUserTodos().then((data) => {
      setTodos(data);
    });
  }, [auth]);

  const finishTodo = async (todoId: string) => {
    const success = await deleteTodo(todoId);
    if (!success) {
      alert("failed to delete that todo...");
    }
    // update todos (rerender)
    const data = await getCurrentUserTodos();
    setTodos(data);
  };

  return (
    <>
      {auth ? (
        <>
          <div>Hello {userDoc?.display_name}</div>
          <button onClick={logOutUser}>Sign Out</button>
          <Link className="pb-20" href="/create">
            <button>Create a new Todo</button>
          </Link>
          <h1>Your Todos:</h1>
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
                    className="justify-self-end"
                    style={{ backgroundColor: todo.data().color }}
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
      ) : (
        <>
          <h1>Welcome to Next-Firebase todos</h1>
          <p>This is a todo app built with Nextjs and Firebase(Auth and Firestore)</p>
          <span className="flex flex-row gap-2 items-center">
            <Link href="/signup" prefetch>
              <button className="hover:bg-opacity-25 hover:bg-white">Sign up</button>
            </Link>
            <p>or</p>
            <Link href="/signin" prefetch>
              <button className="hover:bg-opacity-25 hover:bg-white">Sign in</button>
            </Link>
            <p>to get started</p>
          </span>
        </>
      )}
    </>
  );
}
