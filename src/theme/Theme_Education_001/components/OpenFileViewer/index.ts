import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Platform } from 'react-native';
import md5 from 'md5';

const extname = (filename) => {
    if(!filename||typeof filename!='string'){
        return false
    };
    let a = filename.split('').reverse().join('');
    let b = a.substring(0,a.search(/\./)).split('').reverse().join('');
    return b
}

export default async function open(url: string, fileName: string) {
    if (!url) {
        alert('URI为空')
        return;
    }
    console.log(url)
    const name = extname(url)
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName + md5(url)}.${name}`;
    const isExists = await RNFS.exists(localFile);
    if (!isExists) {
        const options = {
            fromUrl: url,
            toFile: localFile,
            progress: (res) => {

            }
        };
        RNFS.downloadFile(options).promise
            .then(() => FileViewer.open(localFile))
            .then(() => {
                // success

            })
            .catch(error => {
                // error
                alert(error)
            });
    } else {
        FileViewer.open(localFile)
    }
}