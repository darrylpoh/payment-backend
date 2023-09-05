import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCmPIUE1hddy3gaeBP6Z3-GJbbHYgj1WY4",
    authDomain: "tech-series-regine-carry.firebaseapp.com",
    projectId: "tech-series-regine-carry",
    storageBucket: "tech-series-regine-carry.appspot.com",
    messagingSenderId: "758786183712",
    appId: "1:758786183712:web:f89ed78d7d60b12298e245",
    measurementId: "G-7F4ER9CWC2"
  };

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
export default app 

export async function loginUser(loginDetails) { 
    signInWithEmailAndPassword(firebaseAuth, loginDetails.email, loginDetails.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user.getIdToken();
            console.log(user)
            return user 
            // ...
        })
        .catch((error) => {
            console.log(error.message)
            return false 
        });
}