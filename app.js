import firebase from 'firebase/app';
import 'firebase/storage';
import { upload } from './upload.js';

const firebaseConfig = {
    apiKey: "AIzaSyDUIwUMjFfxLSaIE1PQTwoDGPhLlYhsFHg",
    authDomain: "fe-upload-d1b7a.firebaseapp.com",
    projectId: "fe-upload-d1b7a",
    storageBucket: "fe-upload-d1b7a.appspot.com",
    messagingSenderId: "354957434156",
    appId: "1:354957434156:web:1c072ad0ed984e16ffa089"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload('#file', { multi: true, accept: ['.png', '.jpg', '.jpeg', '.gif'], onUpload(files, blocks){
    files.forEach((item, index) => {
        const ref = storage.ref(`images/${item.name}`);
        const task = ref.put(item);
        task.on('state_changed', snapshot => {
            const percent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%';
            const block = blocks[index].querySelector('.preview-info-progress');
            block.textContent = percent;
            block.style.width = percent;
        }, err => console.log(err),
        () => {
            task.snapshot.ref.getDownloadURL().then(url => {
                console.log('Download URL', url);
            })
        })
    });
} });