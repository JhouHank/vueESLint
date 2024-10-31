import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 3600000, // request timeout
});

// 設置請求攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 該處可以將 config 列印出來看一下，該部分將發送給後端（server端）
    console.log('request interceptors config:', config);
    // config.headers.Authorization = store.state.token;
    return config; // 對config處理完後返回，下一步將向後端發送請求
  },
  (error) => {
    // 當發生錯誤時，執行該部分程式碼
    console.log('request interceptors error:', error);
    return Promise.reject(error);
  },
);

// 設置響應攔截器
// token 無效時，清空 token 並強制跳轉登入頁
axiosInstance.interceptors.response.use(
  (response) => {
    // 響應狀態碼為 2xx 時觸發成功的callback，參數中的 response 是「成功的結果」
    console.log('response interceptors response:', response);
    return response;
  },
  (error) => {
    console.log(error); // 印的時候要知道是什麼名字的呼叫出錯 錯誤內容是什麼
    // 響應狀態碼不是 2xx 時觸發失敗的callback，參數中的 error 是「失敗的結果」
    if (error.response.status === 401) {
      // 無效的 token
      // 把 pinia 中的 token 重置為空，並跳轉到登入頁面
      // 1.清空token
      // 2.跳轉登入頁

      console.log('response interceptors error:', error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
