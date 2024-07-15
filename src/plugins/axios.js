import axios from "axios";
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQb3J0YWwvdXNlcm5hbWUiOiJNb3NrYWxlbmtvWWV2aGVuaWkiLCJQb3J0YWwvdXNlcmlkIjoiODZiMjVmYjUtMTVhNC00MDZkLTk2MjEtZWE3NmQ4OGFiMjRhIiwianRpIjoiZTllZGViMGQtOTU0ZC00NjExLWJkYjktZmYyOTg5NjA0MDRkIiwiUG9ydGFsL3Rva2VudmVyc2lvbiI6IjEiLCJQb3J0YWwvY29udGFjdGlkIjoiZjhmYTFkOTUtNTY5My00OTlmLTk2YjktMGM5NTQ3NmU5NGIyIiwiUG9ydGFsL21vZGlmaWVkb24iOiI2Mzg1NTc3MzAxODQ5NTM2NjMiLCJleHAiOjE3MjEwNDAyMTgsImlzcyI6IkxlYXJuaW5nIiwiYXVkIjoiTGVhcm5pbmcgY2xpZW50In0.sbf28aUeq2lbuewHnTerBfg2a3Wzc8Ui5VH-nf73M7c",
  },
  baseURL: "https://learning.banzait.com/back/",
});

export default instance;
