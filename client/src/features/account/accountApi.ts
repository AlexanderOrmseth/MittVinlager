import axios from "axios";
import { ExternalLogin } from "../../app/models/externalLogin";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const accountApi = {
  currentUser: (token?: string | null) =>
    axios
      .get("account/currentUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),
  deleteUser: (token?: string | null) =>
    axios
      .delete("account/delete", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),
  externalLogin: (data: ExternalLogin) =>
    axios.post("account/externalLogin", data).then((res) => res.data),
};

export default accountApi;
