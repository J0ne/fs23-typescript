import axios from "axios";
import { Diary } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(
    `${apiBaseUrl}/diaries`
  );
    console.log(data);
  return data;
};

export default {
  getAll
};