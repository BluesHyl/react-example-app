import { post, get } from "@/http/service";

const login = (data: { email: string; password: string }) => post("/auth/login", data);

const getAllusers = () => get("/user/all");


const createUser = (data) => post("/user/create", data);

const updateUser = (data) => post("/user/update", data);
export { login, getAllusers, updateUser, createUser };
