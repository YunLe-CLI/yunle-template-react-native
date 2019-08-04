import fetch from 'isomorphic-fetch';
import { getOrigin, getToken, clearToken } from './config'
/**
 * @param url 
 * @param option 
 */
export default async function request(url: string, option: any): Promise<any> {
    const response = await fetch(getOrigin(url), { ...option, headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: option.token || getToken() 
    } })
    .catch((err: any) => {
        console.log("fetch error: ", err)
        return err;
    });
    
    return response.json();
}
