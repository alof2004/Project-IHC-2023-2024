import "../css/sections.css"
import Searchuni from "./searchuni" 

const ImageHomeesquerda= () => {
    return(
            <section className="about" id="about">
                <h1 className="heading">
                    <span>Tens o sonho de</span> estudar longe de casa? <span>Encontra a tua nova casa!</span>
                </h1>
                <div className="row">         
                    <div className="content" >
                        <h3>Já escolheste o estabelecimento de ensino?</h3>
                        <p>Escolher a universidade certa é uma decisão crucial que pode impactar significativamente o futuro de alguém.</p>
                        <p>Existem várias considerações a serem feitas ao decidir sobre uma instituição de ensino superior. Cada uma dessas considerações pode influenciar a experiência educacional e as perspectivas de carreira de um estudante. Por isso, é importante dedicar tempo para pesquisar e avaliar cuidadosamente todas as opções disponíveis antes de tomar uma decisão final. </p>
                        <Searchuni/>
                    </div>
                    <div className="video-container">
                        <video src="./src/images/universidade.mp4" loop autoPlay muted></video>
                    </div>
                </div>
         </section>
        
    )
}

export default ImageHomeesquerda; 