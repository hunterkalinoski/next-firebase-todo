"use client";

import { useEffect, useState } from "react";
import { createTodo } from "@lib/database";
import { useRouter } from "next/navigation";
import { useAuthState } from "@hooks/useAuthState";

export default function Page({}) {
  const router = useRouter();
  const [auth] = useAuthState();
  const [color, setColor] = useState("black");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authFetched, setAuthFetched] = useState(false);

  const finishTodo = async () => {
    if (!title) {
      alert("You must enter a title!");
      return;
    }
    const success = await createTodo(title, description, color);
    if (success) {
      router.push("/");
    } else {
      alert("failed to submit your todo!");
    }
  };

  useEffect(() => {
    setAuthFetched(true);
  }, [auth]);
  return (
    <>
      {auth ? (
        <main className="flex flex-col w-full justify-center items-center">
          <h1 className="pb-10">Create a new Todo!</h1>

          <div className="flex flex-row w-1/3 justify-between pb-5">
            <label htmlFor="title-input">Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-80"
              type="text"
              name="title-input"
            />
          </div>
          <div className="flex flex-row w-1/3 justify-between pb-5">
            <label htmlFor="description-textarea">Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-80 h-96 resize-none"
              name="description-textarea"
            ></textarea>
          </div>
          <div className="flex flex-row w-1/3 justify-between pb-5">
            <label htmlFor="Title">Color:</label>
            <select
              id="colors"
              onChange={(e) => setColor(e.target.value)}
              className="text-sm rounded-lg block w-80 p-2.5"
            >
              <option value="black">Black</option>
              {/* <option value="white">White</option>  impossible to see white text */}
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              {/* <option value="yellow">Yellow</option>  impossible to see white text */}
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
            </select>
          </div>

          <button onClick={finishTodo}>Finish</button>
        </main>
      ) : // prompt user to sign in if auth is null
      authFetched ? (
        <main>
          <p>Please sign in before creating a todo!</p>
        </main>
      ) : (
        // show empty page while auth status is unknown
        <main></main>
      )}
    </>
  );
}
