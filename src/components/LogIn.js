import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Alert, Button } from "../elements";
import { ContainerButton, Form, Input } from "../elements/form";
import { ContainerHeader, Header, HeaderTitle } from "../elements/header";
import { ReactComponent as SvgLogin } from "../images/login.svg";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;
`;

export function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (formData.email === "" || formData.password === "") {
      setAlertState(true);
      setAlertProps({ type: "error", msg: "Completa todos los campos" });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setAlertState(true);
      setAlertProps({
        type: "success",
        msg: "Ingresando a la pagina principal...",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      let message;
      switch (errorCode) {
        case "auth/wrong-password":
          message = "La contraseña no es válida";
          break;
        case "auth/internal-error":
          message =
            "Hubo un error inesperado. Revise su conexion a Internet e intente de nuevo.";
          break;
        case "auth/user-not-found":
          message = "No existe ningun usuario con ese correo";
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
        <title>Log In</title>
      </Helmet>
      <Header>
        <ContainerHeader>
          <HeaderTitle>Iniciar Sesion</HeaderTitle>
          <div>
            <Button to="/signup">Registrarse</Button>
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
        <ContainerButton>
          <Button as="button" primary type="submit">
            Iniciar Sesion
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
