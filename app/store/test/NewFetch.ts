import axios from "axios";

export let state = {
  users: [],
};

export const fetchUsers = async () => {
  const response = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data);
  return response;
};

export const setUsers = async () => {
  state.users = await fetchUsers();
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(state.users);
    } catch (err) {
      reject(err);
    }
  });
};
