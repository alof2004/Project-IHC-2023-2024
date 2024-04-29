import "../css/sections.css"


const ImageHome= () => {
    return(
            <section className="about" id="about">
                <h1 className="heading">
                    <span>Deixe-nos </span>avaliar
                </h1>
                <div className="row">
                    <div className="video-container">
                        <video src="./src/images/consultor.mp4" loop autoPlay muted></video>
                        <h3>Asseguramos um certificado para os quartos  de confiança</h3>
                    </div>
                                
                    <div className="content">
                        <h3>Porquê certificar o seu quarto?</h3>
                        <p> Em um mundo onde a qualidade da estadia é primordial, a certificação de quartos emerge como um selo de garantia, promovendo confiança e excelência em experiências de hospedagem.</p>
                        <p>Este processo meticuloso assegura que cada quarto atenda aos mais altos padrões de conforto, higiene e comodidade, oferecendo aos hóspedes uma estadia verdadeiramente memorável. </p>
                        <a href="#" className="Marcar" >Marque uma avaliação</a>
                    </div>
                </div>
         </section>
        
    )
}

export default ImageHome;