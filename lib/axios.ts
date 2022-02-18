import axios from "axios";
import { getAppUrl } from "hooks/useAppUrl";

export const httpClient = axios.create({
  baseURL: getAppUrl(),
  headers: {
    "Content-type": "application/json",
  },
});
