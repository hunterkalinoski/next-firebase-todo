import { AuthUserContext } from "@lib/authUserContext";
import { useContext } from "react";

export default function HelloWorld() {
  const authUser = useContext(AuthUserContext);
  const text: String = "Hello world!";

  return authUser && <div className="bg-teal-200 text-green-600">{text}</div>;
}
