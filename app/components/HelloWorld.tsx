import { UserContext } from "@lib/userContext";
import { useContext } from "react";

export default function HelloWorld() {
  const user = useContext(UserContext);
  const text: String = "Hello world!";

  return user && <div className="bg-teal-200 text-green-600">{text}</div>;
}
