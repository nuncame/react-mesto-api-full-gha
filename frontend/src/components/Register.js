import AuthForm from "./AuthForm";
import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
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
    props.handleRegister(email, password);
  };

  return (
    <>
      <Header />

      <AuthForm
        title='Регистрация'
        name='register'
        btnTitle='Зарегистрироваться'
        handleChange={handleChange}
        email={formValue.email}
        password={formValue.password}
        onSubmit={handleSubmit}
      />
      <div className='auth__caption'>
        <p className='auth__caption-text'>Уже зарегистрированы?</p>
          <Link to='/login' className='auth__caption-link'>
            Войти
          </Link>
      </div>
    </>
  );
}
