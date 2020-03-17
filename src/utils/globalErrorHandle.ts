const noop = () => {};

export const setJSExceptionHandler = (customHandler:(err: any)=>void = noop, allowedInDevMode = false) => {
    if (typeof allowedInDevMode !== "boolean" || typeof customHandler !== "function") {
        return;
    }
    const allowed = allowedInDevMode ? true : !__DEV__;
    if (allowed) {
        // !!! 关键代码
        // 设置错误处理函数
        global.ErrorUtils.setGlobalHandler(customHandler);
        // 改写 console.error，保证报错能被 ErrorUtils 捕获并调用错误处理函数处理
        console.error = (message: string, error: any) => global.ErrorUtils.reportError(error);
    }
};

export const getJSExceptionHandler = () => global.ErrorUtils.getGlobalHandler();

export default {
    setJSExceptionHandler,
    getJSExceptionHandler,
};