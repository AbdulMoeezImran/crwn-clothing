import { useState } from "react";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.style";
import { signInAuthWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
const defaultFormFields = {
    email: "",
    password: ""
}


const SignInForm = () => {
    const [formFields, setFormField] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormField = () => {
        setFormField(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthWithEmailAndPassword(email, password);

            resetFormField();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect [password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default: console.log("Error signing in", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(formFields);

        setFormField({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password} />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;