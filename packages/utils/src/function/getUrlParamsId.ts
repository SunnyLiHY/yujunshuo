// 获取URL中ID参数只值
export const GetUrlParamsId = (): any => {
  const paramStr = window.location.href.split('?')[1];
  if (paramStr) {
    return [Number(paramStr.split('=')[1])];
  }
  return;
};
