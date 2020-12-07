import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IResponse {
  login: (code: string) => Promise<AxiosResponse>;
  getUser: (userId: string) => Promise<AxiosResponse>;
}

export default (apiRequest: AxiosInstance): IResponse => {
  const login = (code: string) => {
    return apiRequest.get(`/api/auth/github?code=${code}`);
  };
  const getUser = (userId: string) => {
    return apiRequest.get(`/api/user/${userId}`);
  };
  return {
    login,
    getUser,
  };
};
