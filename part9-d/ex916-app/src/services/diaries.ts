import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(
    `${apiBaseUrl}/diaries`
  );
    console.log(data);
  return data;
};

const create = async (diary: NewDiaryEntry) => {
    const { data } = await axios.post<NewDiaryEntry>(
        `${apiBaseUrl}/diaries`,
        diary
    );
    return data;
};


export default {
  getAll,
    create
};