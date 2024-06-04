import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";
function CreateUser() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const user = useSelector((store) => store.user.username);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
  }

  return (
    <form onSubmit={handleSubmit}>
      {user && (
        <Button type="primary" to="/menu">
          Continue Ordering, {user}
        </Button>
      )}
      {!user && (
        <>
          <p className="mb-4 text-sm text-stone-600 md:text-base">
            👋 Welcome! Please start by telling us your name:
          </p>
          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input mb-8 w-72"
          />
        </>
      )}
      {!user && username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
