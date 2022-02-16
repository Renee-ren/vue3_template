import axios from "axios";

interface ResponseType<T> {
  returncode: number;
  data: T;
  info?: string;
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResponseType<T>>;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          if (res.data.returncode === 200) {
            resolve(res.data);
          } else {
            //请求错误，抛出异常
            reject(res.data);
          }
        })
        .catch(err => reject(err.data));
    });
  },
};

export default http;
