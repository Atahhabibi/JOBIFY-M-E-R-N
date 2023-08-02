import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow name="name" type="text" defaultValue="john"/>
        <FormRow name="lastName" type="text" defaultValue="mariona" labelText="Last Name"/>
        <FormRow name="location" type="text" defaultValue="San Diego" />
        <FormRow name="email" type="email" defaultValue="john@gmail.com"/>
        <FormRow name="password" type="password" defaultValue="john12345"/>
        

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
