import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./AppBackup.css";
import FormComponent from "./components/FormComponent";
import Items from "./components/Items";
import Exercise1 from "./components/Exercise1";

const USERS_API = "https://api.github.com/users";

const list = ["A", "B", "C", "D"];

function AppBackup() {
  const [usersData, setUsersData] = useState([]);

  const [arrayData, setArrayData] = useState(list);

  const getLoginUsers = (data) => {
    const loginUsers = data.map((dataItem) => dataItem.login);

    setUsersData(loginUsers);
  };

  useEffect(() => {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((res) => getLoginUsers(res));
  }, []);

  const handleItemClick = (element) => {
    const existingData = [...arrayData];

    const dataWithoutSelectedElement = existingData.filter(
      (item) => item !== element
    );

    setArrayData([element, ...dataWithoutSelectedElement]);

    // const arr = [...arrayData];
    // let index = arr.indexOf(element);
    // let removed = arr.splice(index, 1);

    // arr.unshift(removed);

    // setArrayData(arr);
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <h1>Login users</h1>

        {usersData && usersData.length !== 0 && (
          <ul>
            {usersData.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        )}

        {arrayData &&
          arrayData.map((arrayItem) => (
            <li
              key={arrayItem}
              style={{ listStyle: "none" }}
              onClick={() => handleItemClick(arrayItem)}
            >
              {arrayItem}
            </li>
          ))}

        <FormComponent />

        <Items />
      </div>
      <div>
        <Exercise1 />
      </div>
    </>
  );
}

export default AppBackup;
