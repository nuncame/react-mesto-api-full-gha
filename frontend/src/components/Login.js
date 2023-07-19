import AuthForm from "./AuthForm";
import Header from "./Header";
import { useState } from "react";

export default function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    props.handleLogin(email, password);
  };

  return (
    <>
      <Header />

      <AuthForm
        title='Вход'
        name='register'
        btnTitle='Войти'
        handleChange={handleChange}
        email={formValue.email}
        password={formValue.password}
        onSubmit={handleSubmit}
      />
    </>
  );
}
