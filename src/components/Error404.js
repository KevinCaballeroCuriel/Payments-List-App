import React from "react";
import "../styles/Error404.css";

export function Error404() {
  return (
    <div>
      <div id="oopss">
        <div id="error-text">
          <img
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt="404"
          />
          <center>
            <span>Error 404</span>
            <p class="p-a">. La pagina que estas buscando no se encuentra</p>
            <p class="p-b">... Regresa a la pagina principal</p>
            <br />
            <a href="/" class="back">
              ... Regresar
            </a>
          </center>
        </div>
      </div>
    </div>
  );
}
