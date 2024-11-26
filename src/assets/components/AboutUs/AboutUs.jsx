import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1 className="about-us-title">Bienvenido a Recomm Music</h1>
            <h2 className="about-us-subtitle">Desarrolladores</h2>
            <div className="developers">
                <div className="developer-section">
                    <h2 className="developer-role">Back end</h2>
                    <div className="developer">
                        <h3>Axel Fernando Contreras Gonsalez</h3>
                    </div>
                    <div className="developer">
                        <h3>Andrés Silva Garcia</h3>
                    </div>
                </div>
                <div className="developer-section">
                    <h2 className="developer-role">Front end</h2>
                    <div className="developer">
                        <h3>Adrián Moreno Sánchez</h3>
                    </div>
                    <div className="developer">
                        <h3>Ángel Uriel Mireles Renaud</h3>
                    </div>
            </div>
        </div>
        <div className="about-us-description">
            <p>
                La aplicación web tiene la finalidad de mostrar una variedad de canciones de distintos géneros y de distintas épocas.
                Además, las personas se pueden registrar en el sistema para tener un usuario con el cual se pueden crear playlists.
                Las canciones se obtienen desde la API de Spotify, esto para eficientar la experiencia de usuario y la interfaz de la página web.
                Cada canción puede ser reproducida, lo cual le ayuda a los usuarios a escoger sus canciones favoritas para sus listas de canciones.
            </p>
        </div>
    </div>
    );
};

export default AboutUs;
