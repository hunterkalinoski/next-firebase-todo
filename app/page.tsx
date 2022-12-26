"use client";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const createPost = async () => {
    try {
      // const docRef = await addDoc(collection(db, "users"), {
      //   first: "Alan",
      //   middle: "Mathison",
      //   last: "Turing",
      //   born: 1912,
      // });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const logPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <main>
      <div className="bg-blue-200 text-cyan-700">Hello World</div>
      <button onClick={createPost} className="border border-black rounded-sm">
        Create Post
      </button>
      <button onClick={logPosts} className="border border-black rounded-sm">
        Log Posts
      </button>
    </main>
  );
}
