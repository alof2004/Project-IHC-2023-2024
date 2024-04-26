import React, { useState } from 'react';
import '../css/RoomForm.css';
import { useNavigate } from 'react-router-dom';



function RoomForm(){
    // Define state variables to store form field values
    const [id, setId] = useState<number | null>(null);
    const [proprietaria, setProprietaria] = useState('');
    const [imagem1, setImagem1] = useState('');
    const [imagem2, setImagem2] = useState('');
    const [imagem3, setImagem3] = useState('');
    const [imagem4, setImagem4] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [locaisProximos, setLocaisProximos] = useState<string[]>([]);
    const [cidade, setCidade] = useState('');
    const [pais, setPais] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [description, setDescription] = useState('');
    const [transportes, setTransportes] = useState('');
    const [servicos, setServicos] = useState<string[]>([]);
    const [descricaoProprietaria, setDescricaoProprietaria] = useState('');
    const [cama, setCama] = useState('');
    const [cozinha, setCozinha] = useState('');
    const [casasDeBanho, setCasasDeBanho] = useState<number | null>(null);
    const [ambiente, setAmbiente] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [pessoasPermitidas, setPessoasPermitidas] = useState<string[]>([]);
    const [gastos, setGastos] = useState('');
    const [animais, setAnimais] = useState('');
    const [fumadores, setFumadores] = useState('');
    const [area, setArea] = useState('');
    const [vista, setVista] = useState('');
    const [rendaInclui, setRendaInclui] = useState<string[]>([]);
    const [equipamentoDisponivel, setEquipamentoDisponivel] = useState<string[]>([]);
    const navigate = useNavigate();

    const fs = require('fs'); // Importar módulo fs para manipulação de arquivos

    // Função para encontrar o maior ID nos dados do arquivo rooms.json
    const findHighestIdInFile = () => {
        try {
            // Ler o conteúdo do arquivo rooms.json
            const data = fs.readFileSync('rooms.json', 'utf8');
            // Parse dos dados JSON
            const roomsData = JSON.parse(data);
            // Se o arquivo estiver vazio, retornar null
            if (roomsData.length === 0) {
                return null;
            }
            // Encontrar o maior ID
            const highestId = Math.max(...roomsData.map((room: { id: number }) => room.id));
            return highestId;
        } catch (error) {
            console.error('Error reading rooms.json:', error);
            return null;
        }
    };

    // Função para gerar um ID único para um novo quarto
    const generateRoomId = () => {
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        if (roomsData.length === 0) {
            // Se o localStorage estiver vazio, verificar o arquivo `rooms.json` para o maior ID
            const highestIdInFile = findHighestIdInFile();
            return highestIdInFile !== null ? highestIdInFile + 1 : 1;
        } else {
            // Se o localStorage tiver quartos existentes, encontrar o quarto com o maior ID
            const highestIdInLocalStorage = Math.max(...roomsData.map((room: { id: number }) => room.id));
            return highestIdInLocalStorage + 1;
        }
    };

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // Prevent the default form submission behavior
        
        const newRoomId = generateRoomId();
        // Construct an object with the form data
        const formData = {
            id: newRoomId,
            proprietaria,
            imagem1,
            imagem2,
            imagem3,
            imagem4,
            localizacao,
            locaisProximos,
            cidade,
            pais,
            latitude,
            longitude,
            description,
            transportes,
            servicos,
            descricaoProprietaria,
            cama,
            cozinha,
            casasDeBanho,
            ambiente,
            price,
            pessoasPermitidas,
            gastos,
            animais,
            fumadores,
            area,
            vista,
            rendaInclui,
            equipamentoDisponivel,

        };

        console.log(formData);
        localStorage.setItem('roomsData', JSON.stringify(formData));
        console.log('New room added:', formData);
        navigate("../../homeLandlord");


    };

    return ( 
        <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Room Form</h2>
            <input
                type="text"
                placeholder="Nome do Proprietário"
                value={proprietaria}
                onChange={(e) => setProprietaria(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Imagem 1"
                value={imagem1}
                onChange={(e) => setImagem1(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Imagem 2"
                value={imagem2}
                onChange={(e) => setImagem2(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Imagem 3"
                value={imagem3}
                onChange={(e) => setImagem3(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Imagem 4"
                value={imagem4}
                onChange={(e) => setImagem4(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Localização"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Locais Próximos (separados por vírgula)"
                value={locaisProximos.join(',')}
                onChange={(e) => setLocaisProximos(e.target.value.split(','))}
                required
            />
            <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="País"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Latitude"
                value={latitude || ''}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                required
            />
            <input
                type="number"
                placeholder="Longitude"
                value={longitude || ''}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                required
            />
            <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                title="Insira uma breve descrição objetiva do quarto"
            />
            <input
                type="text"
                placeholder="Transportes"
                value={transportes}
                onChange={(e) => setTransportes(e.target.value)}
                required
                title="A quantos metros?"
            />
            <input
                type="text"
                placeholder="Serviços (separados por vírgula)"
                value={servicos.join(',')}
                onChange={(e) => setServicos(e.target.value.split(','))}
                required
                title="Insira os serviços/equipamentos/mobília disponibilizados, separados por vírgulas"
            />
            <input
                type="text"
                placeholder="Descrição da Proprietária"
                value={descricaoProprietaria}
                onChange={(e) => setDescricaoProprietaria(e.target.value)}
                required
                title="Insira a sua breve descrição"
            />
            <input
                type="text"
                placeholder="Cama"
                value={cama}
                onChange={(e) => setCama(e.target.value)}
                required
                title="Casal/Solteiro/Beliche/..."
            />
            <input
                type="text"
                placeholder="Cozinha"
                value={cozinha}
                onChange={(e) => setCozinha(e.target.value)}
                required
                title="Insira a disponibilidade da cozinha"
            />
            <input
                type="number"
                placeholder="Casas de Banho"
                value={casasDeBanho || ''}
                onChange={(e) => setCasasDeBanho(parseFloat(e.target.value))}
                required
                title="Insira o número de casas de banho"
            />
            <input
                type="text"
                placeholder="Ambiente"
                value={ambiente}
                onChange={(e) => setAmbiente(e.target.value)}
                required
                title="Descreva o ambiente"
            />
            <input
                type="number"
                placeholder="Preço"
                value={price || ''}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
                title="Insira o preço"
            />
            <input
                type="text"
                placeholder="Pessoas Permitidas (separadas por vírgula)"
                value={pessoasPermitidas.join(',')}
                onChange={(e) => setPessoasPermitidas(e.target.value.split(','))}
                required
                title="Descreva as pessoas que permite no seu apartamento, separadas por vírgulas"
            />
            <input
                type="text"
                placeholder="Gastos"
                value={gastos}
                onChange={(e) => setGastos(e.target.value)}
                required
                title="Gastos incluidos ou não incluidos?"
            />
            <input
                type="text"
                placeholder="Animais"
                value={animais}
                onChange={(e) => setAnimais(e.target.value)}
                required
                title="Insira se aceita ou nao animais"
            />
            <input
                type="text"
                placeholder="Fumadores"
                value={fumadores}
                onChange={(e) => setFumadores(e.target.value)}
                required
                title="Insira as regras sobre fumadores"
            />
            <input
                type="text"
                placeholder="Área"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                title="Insira a área"
            />
            <input
                type="text"
                placeholder="Vista"
                value={vista}
                onChange={(e) => setVista(e.target.value)}
                required
                title="Descreva a vista"
            />
            <input
                type="text"
                placeholder="Renda Inclui (separado por vírgula)"
                value={rendaInclui.join(',')}
                onChange={(e) => setRendaInclui(e.target.value.split(','))}
                required
                title="Insira o que está incluido na renda, separado por vírgula"
            />
            <input
                type="text"
                placeholder="Equipamento Disponível (separado por vírgula)"
                value={equipamentoDisponivel.join(',')}
                onChange={(e) => setEquipamentoDisponivel(e.target.value.split(','))}
                required
                title="Insira todos os equipamentos disponíveis, separados por vírgula"
            />
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default RoomForm;