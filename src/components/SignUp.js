import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Alert, Button } from "../elements";
import { ContainerButton, Form, Input } from "../elements/form";
import { ContainerHeader, Header, HeaderTitle } from "../elements/header";
import { ReactComponent as SvgLogin } from "../images/register.svg";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [alertState, setAlertState] = useState(false);
  const [alertProps, setAlertProps] = useState({ type: "", msg: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regex.test(formData.email)) {
      setAlertState(true);
      setAlertProps({ type: "error", msg: "Ingresa un correo valido" });
      return;
    }

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.password2 === ""
    ) {
      setAlertState(true);
      setAlertProps({ type: "error", msg: "Completa todos los campos" });
      return;
    }

    if (formData.password !== formData.password2) {
      setAlertState(true);
      setAlertProps({ type: "error", msg: "Las contraseñas no coinciden" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setAlertState(true);
      setAlertProps({
        type: "success",
        msg: "Usuario creado con exito, redirigiendo a la pagina principal...",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      let message;
      switch (errorCode) {
        case "auth/email-already-in-use":
          message =
            "Otro usuario ya está utilizando el correo electrónico proporcionado.";
          break;
        case "auth/internal-error":
          message = "Hubo un error inesperado. Intente de nuevo.";
          break;
        case "auth/invalid-email":
          message = "El email no es válido";
          break;
        case "auth/weak-password":
          message = "La contraseña debe tener al menos 6 caracteres";
          break;
        default:
          message = errorCode + " - " + errorMessage;
          break;
      }
      setAlertState(true);
      setAlertProps({
        type: "error",
        msg: message,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Header>
        <ContainerHeader>
          <HeaderTitle>Crear Cuenta</HeaderTitle>
          <div>
            <Button to="/login">Iniciar Sesion</Button>
          </div>
        </ContainerHeader>
      </Header>
      <Form onSubmit={handleOnSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repetir Contraseña"
          value={formData.password2}
          onChange={handleOnChange}
        />
        <ContainerButton>
          <Button as="button" primary type="submit">
            Crear Cuenta
          </Button>
        </ContainerButton>
      </Form>
      <Alert
        type={alertProps.type}
        msg={alertProps.msg}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </>
  );
}
