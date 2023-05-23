import { useState } from "react";
import { useDispatch } from "react-redux";
import { CONSTANTS } from "../../Redux/constants";
import { SignUpContainer } from "./sign-up-form.style";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}


const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const resetFormField = () => {
    setFormField(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      dispatch({ type: CONSTANTS.EMAIL_SIGN_UP_PENDING, payload: { email, password, displayName } });

      resetFormField();

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else{
        console.log('Error creating user', error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formFields);

    setFormField({ ...formFields, [name]: value });
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;