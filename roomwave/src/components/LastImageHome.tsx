import "../css/sections.css"


const ImageHome= () => {
    return(
            <section className="about" id="about">
                <h1 className="heading">
                    <span>Arrendar pode ser uma </span>boa fonte de rendimento
                </h1>
                <div className="row">
                    <div className="video-container">
                        <video src="./src/images/renda.mp4" loop autoPlay muted></video>
                    </div>
                                
                    <div className="content">
                        <h3>Tem quartos para arrendar?</h3>
                        <p>A importância de alugar quartos vai além de simplesmente oferecer um espaço para dormir temporariamente.</p>
                        <p>É um reflexo das necessidades modernas de mobilidade, economia e comodidade. Aqui está um texto que explora essa importância.
                        Alugar quartos não se trata apenas de encontrar um espaço físico para descansar temporariamente; é sobre proporcionar uma experiência 
                        acolhedora e confortável que atenda às demandas de indivíduos em trânsito, estudantes em busca de moradia temporária, profissionais 
                        viajantes ou mesmo famílias que precisam de acomodações adicionais.
                        </p>
                        <a href="#" className="Marcar" >Quero colocar um quarto para alugar</a>
                    </div>
                </div>
         </section>
        
    )
}

export default ImageHome;