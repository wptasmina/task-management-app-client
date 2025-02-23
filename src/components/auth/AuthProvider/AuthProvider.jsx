import { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
   onAuthStateChanged, 
   signInWithEmailAndPassword, 
   signInWithPopup, 
   signOut, 
   updateProfile} from "firebase/auth";
   
  import auth from './../../../Firebase/firebase.inti';



// export const AuthContext = createContext()
export const AuthContext = createContext(null); // Create context

export default function AuthProvider({children}) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Register create User
  const createUser = ( email, password ) =>{
    // console.log(auth)
    setLoading(true);
    return createUserWithEmailAndPassword( auth, email, password )
  }

  //Login / signInUser
  const signInUser = ( email, password) =>{
    setLoading(true);
   return signInWithEmailAndPassword(auth, email, password)

  }

   //LogOut
   const signOutUser = () =>{
    setLoading(true);
    return signOut(auth)
  }

    // GoogleProvider create
    const Provider = new GoogleAuthProvider(); 

    // GoogleProvider
    const handleGoogleLogin = (e) =>{
      setLoading(true);
      return signInWithPopup(auth, Provider)
    }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser)
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);


  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    handleGoogleLogin,
    signOutUser,
    updateUserProfile
  }
  
  return (
    <>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
