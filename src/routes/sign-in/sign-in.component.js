import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from '../../components/button/button.component';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocReference = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>SignIn</h1>
      <Button buttonType="google" onClick={logGoogleUser}>Sign in with Google Popup</Button>
      <SignUpForm/>
    </div>
  )
}

export default SignIn;