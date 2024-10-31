import axiosInstance from '@/api/axiosInstance';

const api = {
  getStyleView: '/getStyleView', // 風格 api
  getMockUserInfo: '/mock/getUserInfo',
  getErrorAPI: '/mock/errorAPI',
};

export function getStyleView(data) {
  return axiosInstance({
    url: api.getStyleView,
    method: 'post',
    data,
  });
}

export function getMockUserInfo() {
  return axiosInstance({
    url: api.getMockUserInfo,
    method: 'get',
  });
}

export function getErrorAPI() {
  return axiosInstance({
    url: api.getErrorAPI,
    method: 'get',
  });
}
