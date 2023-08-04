import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success('Registration successful')
     return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error?.response?.data);
    return null;
  }
};



const Register = () => {

  const navigation=useNavigation();
  const isSubmitting=navigation.state==='submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow name="name" type="text" defaultValue="john" />
        <FormRow
          name="lastName"
          type="text"
          defaultValue="mariona"
          labelText="Last Name"
        />
        <FormRow name="location" type="text" defaultValue="San Diego" />
        <FormRow name="email" type="email" defaultValue="john@gmail.com" />
        <FormRow name="password" type="password" defaultValue="john12345" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting?"submitting....":"submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
