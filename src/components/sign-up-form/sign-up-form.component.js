import { useState } from "react";
import "./sign-up-form.style.scss";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}


const SignUpForm = () => {
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
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });

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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;