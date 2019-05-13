import fetch from 'isomorphic-fetch';
import hash from 'hash.js';
import { getOrigin } from './config'


const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};

const cachedSave = (response, hashcode) => {
    /**
     * Clone a response data and store it in sessionStorage
     * Does not support data other than json, Cache only json
     */
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.match(/application\/json/i)) {
        // All data is saved as text
        response
            .clone()
            .text()
            .then(content => {
                sessionStorage.setItem(hashcode, content);
                sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
            });
    }
    return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
    const options = {
        expirys: isAntdPro(),
        ...option,
    };
    /**
     * Produce fingerprints based on url and parameters
     * Maybe url has the same parameters
     */
    const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
    const hashcode = hash
        .sha256()
        .update(fingerprint)
        .digest('hex');

    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }

    const expirys = options.expirys && 60;
    // options.expirys !== false, return the cache,
    if (options.expirys !== false) {
        const cached = sessionStorage.getItem(hashcode);
        const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
        if (cached !== null && whenCached !== null) {
            const age = (Date.now() - whenCached) / 1000;
            if (age < expirys) {
                const response = new Response(new Blob([cached]));
                return response.json();
            }
            sessionStorage.removeItem(hashcode);
            sessionStorage.removeItem(`${hashcode}:timestamp`);
        }
    }
    return fetch(getOrigin(url), newOptions)
        .then(checkStatus)
        .then(response => cachedSave(response, hashcode))
        .then(response => {
            // DELETE and 204 do not return data by default
            // using .json will report an error.
            // if (newOptions.method === 'DELETE' || response.status === 204) {
            //   return response.text();
            // }
            return response.json();
        })
}
