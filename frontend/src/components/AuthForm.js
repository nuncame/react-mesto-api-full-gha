export default function AuthForm(props) {
  return (
    <div className='auth__container'>
      <h1 className='auth__header'>{props.title}</h1>
      <form
        className={`auth__form auth__form_type_${props.name}`}
        name='authForm'
        onSubmit={props.onSubmit}
      >
        <input
          type='email'
          className='auth__input auth__input_textfield_email'
          name='email'
          id={`${props.name}-email-input`}
          value={props.email}
          onChange={props.handleChange}
          placeholder='E-mail'
          minLength='2'
          maxLength='40'
          required
        />
        <input
          type='password'
          className='auth__input popup__input_textfield_password'
          name='password'
          id={`${props.name}-password-input`}
          value={props.password}
          onChange={props.handleChange}
          placeholder='Пароль'
          minLength='2'
          maxLength='40'
          required
        />
        <button type='submit' className='auth__submit-btn' >
          {props.btnTitle}
        </button>
      </form>
    </div>
  );
}
