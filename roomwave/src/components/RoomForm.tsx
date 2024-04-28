import React, { useState } from 'react';
import '../css/RoomForm.css';
import { useNavigate } from 'react-router-dom';
import {useUser} from './UserContext';

function RoomForm(){
    // Define state variables to store form field values
    const [id, setId] = useState<number | null>(null);
    const [proprietaria, setProprietaria] = useState('');
    //const [imagem1, setImagem1] = useState('');
    //const [imagem2, setImagem2] = useState('');
    //const [imagem3, setImagem3] = useState('');
    //const [imagem4, setImagem4] = useState('');
    const [images, setImages] = useState<string[]>([]);
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
    const [genero, setGenero] = useState<string[]>([]);
    const [tipoQuarto, setTipoQuarto] = useState('');
    const [wc, setWC] = useState('');
    const [alojamento, setAlojamento] = useState('');
    const navigate = useNavigate();


    const generateRoomId = () => {
        // Retrieve the current list of rooms from localStorage
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        // If there are no rooms, start with ID 1
        if (roomsData.length === 0) {
            return 1;
        }
        // Otherwise, find the highest ID and increment it
        const highestId = Math.max(...roomsData.map((room: { id: number }) => room.id));
        return highestId + 1;
    };

    const [isOpen, setIsOpen] = useState(false);
    const distances = [100, 200, 300, 400, 500];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectDistance = (distance: number) => {
        setTransportes(distance === 500 ? 'a +500m' : `a ${distance}m`);
        setIsOpen(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray: string[] = [];
            for (let i = 0; i < Math.min(files.length, 4); i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target) {
                        fileArray.push(event.target.result as string);
                        if (fileArray.length === Math.min(files.length, 4)) {
                            setImages(fileArray);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        const newRoomId = generateRoomId();
        // Construct an object with the form data
        const formData = {
            id: newRoomId,//ta
            proprietaria, //mais ou menos
            //imagem1,
            //imagem2,
            //imagem3,
            //imagem4,
            images: images, //ta
            localizacao, //ta
            locaisProximos, //ta
            cidade, //ta
            pais, //ta
            latitude, //ta
            longitude, //ta
            description, //ta
            transportes, //ta
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
        const { user } = useUser();
        formData.proprietaria = user?.firstname + " " + user?.lastname;
        // Assuming you have a mechanism to store all rooms in an array in localStorage
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        roomsData.push(formData);
        localStorage.setItem('roomsData', JSON.stringify(roomsData));
        console.log('New room added:', formData);
        navigate("../../homeLandlord");
    };

    return ( 
        <div className="addroom-container">
        <form className="addroom-form" onSubmit={handleSubmit}>
            <h2>Room Form</h2>
            <label htmlFor="localizacao" className="label1">Localização</label>
            <input
                type="text"
                placeholder="Localização"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
                title="Insira a rua/morada"
            />

            <div className="image-upload-container">
                <label className="image-upload-label">Upload Images (Max 4)</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="image-upload-input"
                />
                <div className="image-preview-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="image-preview"
                            style={{ width: `calc(25% - 10px)` }} // Set width to 25% of container width with margin
                        />
                    ))}
                </div>
            </div>
            
            <label htmlFor="Locais Próximos (separados por vírgula)" className="label1">Locais próximos</label>
            <input
                type="text"
                placeholder="Locais Próximos (separados por vírgula)"
                value={locaisProximos.join(',')}
                onChange={(e) => setLocaisProximos(e.target.value.split(','))}
                required
            />

            <div className="location-info-container">
                <div className="label-container">
                    <label htmlFor="cidade" className="label1">Cidade</label>
                    <input
                        type="text"
                        id="cidade"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required
                    />
                </div>
                
                <div className="label-containerend">
                    <label htmlFor="pais" className="label1">País</label>
                    <input
                        type="text"
                        id="pais"
                        placeholder="País"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        required
                    />
                </div>
                
                <div className="label-container1">
                    <label htmlFor="latitude" className="label1">Latitude</label>
                    <input
                        type="number"
                        id="latitude"
                        placeholder="Latitude"
                        value={latitude || ''}
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                        required
                    />
                </div>
                
                <div className="label-container1">
                    <label htmlFor="longitude" className="label1">Longitude</label>
                    <input
                        type="number"
                        id="longitude"
                        placeholder="Longitude"
                        value={longitude || ''}
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                        required
                    />
                </div>
            </div>
            
            <div className="descricao-label-container">
                <label htmlFor="descricao" className="descricao-label">Descrição</label>
                <textarea
                    id="descricao"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="descricao-input"
                    title="Insira uma breve descrição objetiva do quarto"
                />
            </div>

            <div className="dropdown-container">
                <label className="dropdown-label">Transport Distance</label>
                <input
                    type="text"
                    value={transportes}
                    placeholder="Select Distance"
                    readOnly
                    onClick={handleToggle}
                    className="dropdown-input"
                />
                {isOpen && (
                    <div className="options-container">
                        {distances.map((distance, index) => (
                            <div
                                key={index}
                                className="option-item"
                                onClick={() => handleSelectDistance(distance)}
                            >
                                {distance === 500 ? '+500m' : `${distance}m`}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
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
                type="text"
                placeholder="Tipo de quarto"
                value={tipoQuarto}
                onChange={(e) => setTipoQuarto(e.target.value)}
                required
                title="T1,T2,T3,T4"
            />
            <input
                type="text"
                placeholder="Géneros"
                value={genero.join(',')}
                onChange={(e) => setGenero(e.target.value.split(','))}
                required
                title="Insira os géneros permitidos"
            />
            <input
                type="text"
                placeholder="Wc"
                value={tipoQuarto}
                onChange={(e) => setTipoQuarto(e.target.value)}
                required
                title="T1,T2,T3,T4"
            />
            <input
                type="text"
                placeholder="Tipo de quarto"
                value={wc}
                onChange={(e) => setWC(e.target.value)}
                required
                title="Partilhado/Individual/..."
            />
            <input
                type="text"
                placeholder="Alojamento"
                value={alojamento}
                onChange={(e) => setAlojamento(e.target.value)}
                required
                title="Apartamento/Casa/..."
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