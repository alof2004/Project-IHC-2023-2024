import "../css/sections.css"
import TextField from "@mui/material/TextField";
import List from "./List"
import { useState } from "react";

const ImageHomeesquerda= () => {
const [inputText, setInputText] = useState("");
let inputHandler = (e: { target: { value: string; }; }) => {
//convert input text to lower case
var lowerCase = e.target.value.toLowerCase();
setInputText(lowerCase);
    };
    return(
            <section className="about" id="about">
                <h1 className="heading">
                    <span>Tens o sonho de estudar</span> longe <span>de casa</span>
                </h1>
                <div className="row">         
                    <div className="content">
                        <h3>Já escolheste o estabelecimento de ensino?</h3>
                        <p>Escolher uma universidade é uma das decisões mais significativas que uma pessoa pode fazer em sua jornada educacional e profissional</p>
                        <p>A importância desse processo vai além do simples ato de selecionar uma instituição de ensino superior; envolve uma série de considerações que moldarão não apenas os anos acadêmicos, mas também o futuro pessoal e profissional de um indivíduo. </p>
                        <div className="principal_search">
                            <h1>Pesquise pelo seu estabelecimento</h1>
                            <div className="search_container">
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              fullWidth
                              label="Search"
                            />
                            </div>
                            
                        </div>
                    </div>
                    <div className="video-container">
                        <video src="./src/images/consultor.mp4" loop autoPlay muted></video>
                    </div>
                    
                </div>
         </section>
        
    )
}

export default ImageHomeesquerda;