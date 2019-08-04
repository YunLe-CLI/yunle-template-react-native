// eslint-disable-next-line
const APP_ENV: string = 'production';
const VERSION: string = '0.0.1';
const ENV = APP_ENV;
export function getEnv() {
    let env = 'production';
    // eslint-disable-next-line
    switch (ENV) {
        case 'production': {
            env = 'production';
            break
        }
        case 'development': {
            env = 'development';
            break
        }
        case 'QA': {
            env = 'QA';
            break
        }
        case 'stage': {
            env = 'stage';
            break
        }
        default: {
            env = 'production';
        }
    }
    return env;
}

export function getOrigin(url = '') {
    // eslint-disable-next-line
    const urlP = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    let origin = '';
    if (urlP.test(url)) {
        return url
    }
    switch (getEnv()) {
        case 'production': {
            origin = 'http://103.99.210.193:8087';
            break
        }
        case 'development': {
            // origin = '';
            origin = 'http://192.168.0.110:10086';
            break
        }
        case 'QA': {
            origin = 'http://47.98.119.101:10086';
            break
        }
        case 'stage': {
            origin = 'http://47.110.148.4:1080';
            break
        }
        default: {
            origin = '';
        }
    }
    return origin + url;
}

export function setToken(token: string): any {
    return localStorage.setItem('token', token);
}
export function getToken(): any  {
    return localStorage.getItem('token');
}
export function clearToken(): any  {
    return localStorage.removeItem('token');
}

export function getVersion() {
    // eslint-disable-next-line
    return `v${VERSION || '0.0.0'}`
}
