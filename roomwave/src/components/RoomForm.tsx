import React, { useState, useEffect } from 'react';
import '../css/RoomForm.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import jsonData from './rooms.json';
import "leaflet/dist/leaflet.css";
import Calendar from './Calendar';

function RoomForm() {
    // Define state variables to store form field values
    const [id, setId] = useState<number | null>(null);
    const [proprietaria, setProprietaria] = useState('');
    const [telefone, setTelefone] = useState('');
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
    const [mobilia, setServicos] = useState<string[]>([]);
    const [descricaoProprietaria, setDescricaoProprietaria] = useState('');
    const [cama, setCama] = useState('');
    const [cozinha, setCozinha] = useState('');
    const [casasDeBanho, setCasasDeBanho] = useState<number | undefined>(undefined);
    const [ambiente, setAmbiente] = useState('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [pessoasPermitidas, setPessoasPermitidas] = useState<string[]>([]);
    const [gastos, setGastos] = useState('');
    const [animais, setAnimais] = useState('');
    const [fumadores, setFumadores] = useState('');
    const [area, setArea] = useState<number | undefined>(undefined);
    const [vista, setVista] = useState('');
    const [rendaInclui, setRendaInclui] = useState<string[]>([]);
    const [equipamentoDisponivel, setEquipamentoDisponivel] = useState<string[]>([]);
    const [genero, setGenero] = useState<string[]>([]);
    const [tipoQuarto, setTipoQuarto] = useState('');
    const [wc, setWC] = useState('');
    const [alojamento, setAlojamento] = useState('');
    const [andar, setAndar] = useState('');
    const [avaliado, setAvaliado] = useState('');
    const [avaliacao, setAvaliacao] = useState<number | null>(null);
    const [data_entrada, setDataEntrada] = useState('');
    const [data_saida, setDataSaida] = useState('');
    const [requestaval, setRequestAval] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();
    const [clicked, setClicked] = useState(false);



    const generateRoomId = () => {
        // Retrieve the current list of rooms from localStorage
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        // If there are no rooms, start with ID 1
        if (roomsData.length === 0) {
            return null;
        }
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

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray: string[] = [];
            for (let i = 0; i < Math.min(files.length, 4); i++) {
                const file = files[i];
                const resizedImage = await resizeImage(file); // Função para redimensionar a imagem
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target) {
                        fileArray.push(event.target.result as string);
                        if (fileArray.length === Math.min(files.length, 4)) {
                            setImages(fileArray);
                        }
                    }
                };
                reader.readAsDataURL(resizedImage);
            }
        }
    };
    const resizeImage = async (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const img = new Image();
                    img.src = event.target.result as string;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        if (!ctx) {
                            reject(new Error('Failed to get canvas context'));
                            return;
                        }

                        const targetWidth = 800; // Largura desejada
                        const targetHeight = 200; // Altura desejada
                        canvas.width = targetWidth;
                        canvas.height = targetHeight;

                        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                        canvas.toBlob((blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error('Failed to resize image'));
                            }
                        }, file.type);
                    };
                }
            };
            reader.readAsDataURL(file);
        });
    };


    const uniqueEquipmentNames = Array.from(new Set(jsonData.flatMap(property => property.Equipamento_disponivel)));

    const toggleEquipment = (equipment: string) => {
        if (equipamentoDisponivel.includes(equipment)) {
            setEquipamentoDisponivel(prevState => prevState.filter(item => item !== equipment));
        } else {
            setEquipamentoDisponivel(prevState => [...prevState, equipment]);
        }
    };

    const [showEquipmentOptions, setShowEquipmentOptions] = useState(false);

    const handleToggleOptions = () => {
        setShowEquipmentOptions(prevState => !prevState);
    };


    const uniqueMobiliaNames = Array.from(new Set(jsonData.flatMap(property => property.mobilia)));

    const toggleMobilia = (mobil: string) => {
        if (mobilia.includes(mobil)) {
            setServicos(prevState => prevState.filter(item => item !== mobil));
        } else {
            setServicos(prevState => [...prevState, mobil]);
        }
    };

    const [showMobiliaOptions, setShowMobiliaOptions] = useState(false);

    const handleToggleOptionsMobil = () => {
        setShowMobiliaOptions(prevState => !prevState);
    };


    const handleClick = () => {
        if (!clicked) {
            setAvaliado('aguardar');
            setClicked(true);
            console.log(id + ' A aguardar avaliacao');
        } else {
            setAvaliado('Não');
            setClicked(false);
        }
    };



    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Construct an object with the form data
        const formData = {
            id: 100,
            Proprietaria: proprietaria,
            imagem1: images[0] || "", // Assuming images is an array of image URLs
            imagem2: images[1] || "",
            imagem3: images[2] || "",
            imagem4: images[3] || "",
            localizacao: localizacao,
            Locais_proximos: locaisProximos,
            cidade: cidade,
            país: pais,
            latitude: latitude,
            longitude: longitude,
            description: description,
            Transportes: transportes,
            mobilia: mobilia,
            Descrição_Proprietaria: descricaoProprietaria,
            Cama: cama,
            Cozinha: cozinha,
            casas_de_banho: casasDeBanho,
            Ambiente: ambiente,
            price: price,
            Pessoas_permitidas: genero, // This should be an array of strings, e.g., ["Masculino", "Feminino"]
            gastos: gastos,
            Animais: animais,
            Fumadores: fumadores,
            area: area,
            Vista: vista,
            Renda_inclui: rendaInclui, // This should be an array of strings
            Equipamento_disponivel: equipamentoDisponivel,
            Genero: genero, // This should be an array of strings
            TipoQuarto: tipoQuarto,
            WC: wc,
            Alojamento: alojamento,
            Andar: andar,
            Avaliado: avaliado,
            Avaliacao: avaliacao,
            data_entrada: data_entrada,
            data_saida: data_saida,
            telefone: telefone
        };


        console.log(formData);
        const user = JSON.parse(localStorage.getItem('userData') || '{}');
        formData.Proprietaria = user?.firstname + " " + user?.lastname;
        formData.telefone = user?.phone ?? '';
        formData.Avaliacao = 0;
        if(avaliado === ""){
            formData.Avaliado = "Não";
        }
        formData.Renda_inclui = [];
        // Assuming you have a mechanism to store all rooms in an array in localStorage
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        const newNumber = generateRoomId();
        if (newNumber) {
            formData.id = newNumber;
        }
        roomsData.push(formData);
        localStorage.setItem('roomsData', JSON.stringify(roomsData));
        console.log('New room added:', formData);
        navigate("../../homeLandlord");
    };

    //const nextStep = () => {
    //    setStep(step + 1);
    //};

    //const prevStep = () => {
    //    setStep(step - 1);
    //};

    const [step, setstep] = useState(1);
    const length = 4; // Defina o número total de etapas aqui

    const handleStepClick = (step: number) => {
        setstep(step);
    };

    const handleButtonstep = (increment: number) => {
        const newstep = step + increment;
        setstep(newstep);
    };

    const handleDateChange = (start: string, end: string) => {
        setDataEntrada(start);
        setDataSaida(end);
    };

    const steps = [];
    for (let i = 1; i <= length; i++) {
        const isActive = i <= step;
        const isLActive = i + 1 <= step;
        steps.push(
            <div>
                <div
                    key={i}
                    className={`step ${isActive ? 'active' : ''}`}
                >
                    {i}
                </div>
                {i !== length && <div className={`progress-line ${isLActive ? 'active' : ''}`} key={`line-${i}`}></div>}
            </div>
        );
    }

    const isFormValid1 = () => {
        return localizacao && images.length > 0 && cidade && data_entrada && data_saida;
    };
    const isFormValid2 = () => {
        return description && cozinha && casasDeBanho && alojamento && descricaoProprietaria;
    };
    const isFormValid3 = () => {
        return 1 == 1;
    };

    return (
        <div className="addroom-container">
            <div className="progress" data-step={step}>
                {steps}
                <div className="progress-bar"></div>
            </div>
            {step === 1 && (
                <div className="a4">
                    <form className="addroom-form" onSubmit={handleSubmit}>
                        <h2>Formulário para adicionar um quarto</h2>

                        <label htmlFor="localizacao" className="label1">Morada (Rua) *</label>
                        <input
                            type="text"
                            placeholder="Morada"
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                            style={{ ...(localizacao === "" && { borderColor: "red", borderWidth: "5px" }) }}
                            required
                            title="Insira a rua/morada"
                        />

                        <div className="image-upload-container">
                            <label className="image-upload-label">Upload Images (Max 4) *</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="image-upload-input"
                                style={{ ...(images.length == 0 && { borderColor: "red", borderWidth: "5px" }) }}
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
                                <label htmlFor="cidade" className="label1">Cidade *</label>
                                <select
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    required
                                    style={{ ...(cidade === "" && { borderColor: "red", borderWidth: "5px" }) }}
                                    title="Insira a cidade onde se encontra o alojamento"
                                >
                                    <option value="">Cidade</option>
                                    <option value="Aveiro">Aveiro</option>
                                    <option value="Beja">Beja</option>
                                    <option value="Braga">Braga</option>
                                    <option value="Bragança">Bragança</option>
                                    <option value="Castelo Branco">Castelo Branco</option>
                                    <option value="Coimbra">Coimbra</option>
                                    <option value="Évora">Évora</option>
                                    <option value="Faro">Faro</option>
                                    <option value="Guarda">Guarda</option>
                                    <option value="Leiria">Leiria</option>
                                    <option value="Lisboa">Lisboa</option>
                                    <option value="Portalegre">Portalegre</option>
                                    <option value="Porto">Porto</option>
                                    <option value="Santarém">Santarém</option>
                                    <option value="Setúbal">Setúbal</option>
                                    <option value="Viana do Castelo">Viana do Castelo</option>
                                    <option value="Vila Real">Vila Real</option>
                                    <option value="Viseu">Viseu</option>
                                </select>
                            </div>
                        </div>
                        
                        <label htmlFor="cidade" className="label1">Datas *</label>
                        <div
                            style={{
                                width: '30%',
                                padding: '5px',
                                height: '20%',
                                margin: '10px',
                                marginBottom: '200px',
                                borderTop: '1px solid #333',
                                marginTop: '150px',
                                backgroundColor: 'white',
                                color: 'white',
                                border: 'none',
                                alignContent:"center",
                                marginLeft: '35%',
                                marginRight: '37%',
                                scale: '1.5',
                                ...(data_entrada === "" && { backgroundColor: "red"})
                            }}
                        >
                            <Calendar onDateChange={handleDateChange} />
                        </div>
                        <div style={{ marginTop: "100px" }}>
                            <button
                                className="buttonJoao"
                                id="prev"
                                disabled={step === 1}
                                onClick={() => handleButtonstep(-1)}
                                style={{
                                    float: 'left',
                                    backgroundColor: step === 1 ? '#985353' : '#e1261c', // Grey when disabled, red when enabled
                                    color: '#fff'
                                }}
                            >
                                Back
                            </button>
                            <button
                                className="buttonJoao"
                                id="next"
                                disabled={step === length || !isFormValid1()} // Disable if on last step or form is invalid
                                onClick={() => handleButtonstep(1)}
                                style={{ float: 'right', ...(step === length || !isFormValid1() ? { backgroundColor: '#71b36e' } : {backgroundColor: "#18c454"}) }} // Grey when disabled
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {step === 2 && (
                <div className="a4">
                    <form className="addroom-form" onSubmit={handleSubmit}>
                        <label htmlFor="localizacao" className="label1">Titulo *</label>
                        <input
                            type="text"
                            placeholder="Escreva uma pequena frase que descreva o quarto (Esta frase é a que irá aparecer destacada no anuncio do seu quarto)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={80}
                            style={{ ...(description === "" && { borderColor: "red", borderWidth: "5px" }) }}
                            required
                            title="Escreva uma pequena frase que descreva o quarto (Esta frase é a que irá aparecer destacada no anuncio do seu quarto)"
                        />


                        <div className="location-info-container1">
                            <div className="label-container2">
                                <div className="dropdown-container">
                                    <label className="dropdown-label" style={{ marginTop: "13px" }}>Distancia aos meios de transporte</label>
                                    <select
                                        value={transportes}
                                        onChange={(e) => setTransportes(e.target.value)}
                                        title="Insira a que distância se encontra o transporte publico mais próximo"
                                        style= {{ fontSize:"40px"}}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="a 100m">a 100m</option>
                                        <option value="a 200m">a 200m</option>
                                        <option value="a 300m">a 300m</option>
                                        <option value="a 400m">a 400m</option>
                                        <option value="a 500m">a 500m</option>
                                        <option value="a +500m">a +500m</option>
                                    </select>
                                </div>
                            </div>

                            <div className="label-container4">
                                <label htmlFor="Cama" className="label1">Cama</label>
                                <select
                                    value={cama}
                                    onChange={(e) => setCama(e.target.value)}
                                    title="Insira o tipo de cama (casal/solteiro/beliche)"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Casal">Casal</option>
                                    <option value="Solteiro">Solteiro</option>
                                    <option value="Beliche">Beliche</option>
                                </select>
                            </div>

                            <div className="label-container3">
                                <label htmlFor="cozinha" className="label1">Cozinha *</label>
                                <select
                                    value={cozinha}
                                    onChange={(e) => setCozinha(e.target.value)}
                                    style={{ ...(cozinha === "" && { borderColor: "red", borderWidth: "5px" }) }}
                                    required
                                    title="Indique se o alojamento tem cozinha"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </div>

                            <div className="label-container5">
                                <label htmlFor="Casas de banho" className="label1">Casas de Banho *</label>
                                <input
                                    type="number"
                                    placeholder="Nº de casas de banhos"
                                    value={casasDeBanho || undefined}
                                    style={{ ...(casasDeBanho === undefined && { borderColor: "red", borderWidth: "5px" }) }}
                                    onChange={(e) => setCasasDeBanho(e.target.value === '' || parseFloat(e.target.value) < 0 ? undefined : parseFloat(e.target.value))}
                                    required
                                    title="Número de casas de banho"
                                />

                            </div>

                            <div className="label-container4">
                                <label htmlFor="WC" className="label1">WC</label>
                                <select
                                    value={wc}
                                    onChange={(e) => setWC(e.target.value)}
                                    title="Insira o tipo de WC (individual/partilhado)"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Partilhado">Partilhado</option>
                                </select>
                            </div>

                            <div className="label-container3">
                                <label htmlFor="alojamento" className="label1">Alojamento</label>
                                <select
                                    value={alojamento}
                                    onChange={(e) => setAlojamento(e.target.value)}
                                    style={{ ...(alojamento === "" && { borderColor: "red", borderWidth: "5px" }) }}
                                    required
                                    title="Indique o tipo de alojamento"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Casa">Casa</option>
                                </select>
                            </div>

                        </div>

                        <div className="descricao-label-container">
                            <label htmlFor="descricao" className="descricao-label">Descrição</label>
                            <textarea
                                id="descricao"
                                placeholder="Descrição"
                                value={descricaoProprietaria}
                                style={{ ...(descricaoProprietaria === "" && { borderColor: "red", borderWidth: "5px" }) }}
                                onChange={(e) => setDescricaoProprietaria(e.target.value)}
                                required
                                className="descricao-input"
                                title="Insira aqui uma descrição do quarto"
                            />
                        </div>
                        <div style={{ marginTop: "100px" }}>
                            <button
                                className="buttonJoao"
                                id="prev"
                                disabled={step === 1}
                                onClick={() => handleButtonstep(-1)}
                                style={{
                                    float: 'left',
                                    backgroundColor: step === 1 ? '#985353' : '#e1261c', // Grey when disabled, red when enabled
                                    color: '#fff',
                                }}
                            >
                                Back
                            </button>
                            <button
                                className="buttonJoao"
                                id="next"
                                disabled={step === length || !isFormValid2()} // Disable if on last step or form is invalid
                                onClick={() => handleButtonstep(1)}
                                style={{ float: 'right', ...(step === length || !isFormValid1() ? { backgroundColor: '#71b36e' } : {backgroundColor: "#18c454"}) }} // Grey when disabled
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {step === 3 && (
                <div className="a4">
                    <form className="addroom-form" onSubmit={handleSubmit}>
                        <label className="label1">Equipamento disponível:</label>
                        <div className="equipment-options">
                            {uniqueEquipmentNames.map((equipment, index) => (
                                <div key={index} className="equipment-option">
                                    <div className="divcheckbox">
                                        <input
                                            type="checkbox"
                                            id={`equipment-${index}`}
                                            value={equipment}
                                            onChange={() => toggleEquipment(equipment)}
                                            checked={equipamentoDisponivel.includes(equipment)}
                                        />
                                    </div>
                                    <div className="divlabel">
                                        <label htmlFor={`equipment-${index}`}>{equipment}</label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <label className="label1">Mobilia disponível:</label>
                        <div className="equipment-options">
                            {uniqueMobiliaNames.map((mobil, index) => (
                                <div key={index} className="equipment-option">
                                    <div className="divcheckbox">
                                        <input
                                            type="checkbox"
                                            id={`mobil-${index}`}
                                            value={mobil}
                                            onChange={() => toggleMobilia(mobil)}
                                            checked={mobilia.includes(mobil)}
                                        />
                                    </div>
                                    <div className="divlabel">
                                        <label htmlFor={`mobil-${index}`}>{mobil}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: "100px" }}>
                            <button
                                className="buttonJoao"
                                id="prev"
                                disabled={step === 1}
                                onClick={() => handleButtonstep(-1)}
                                style={{
                                    float: 'left',
                                    backgroundColor: step === 1 ? '#985353' : '#e1261c', // Grey when disabled, red when enabled
                                    color: '#fff'
                                }}
                            >
                                Back
                            </button>
                            <button
                                className="buttonJoao"
                                id="next"
                                disabled={step === length || !isFormValid3()} // Disable if on last step or form is invalid
                                onClick={() => handleButtonstep(1)}
                                style={{ float: 'right', ...(step === length || !isFormValid1() ? { backgroundColor: '#71b36e' } : {backgroundColor: "#18c454"}) }} // Grey when disabled
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {step === 4 && (
                <div className="a4">
                    <form className="addroom-form" onSubmit={handleSubmit}>

                        <div className="location-info-container2">

                            <div className="label-container3">
                                <label htmlFor="tipodequarto" className="label1">Tipologia</label>
                                <select
                                    value={tipoQuarto}
                                    onChange={(e) => setTipoQuarto(e.target.value)}

                                    title="Indique se o alojamento é um T0/T1/T2/T3/..."
                                >
                                    <option value="">Selecione...</option>
                                    <option value="T0">T0</option>
                                    <option value="T1">T1</option>
                                    <option value="T2">T2</option>
                                    <option value="T3">T3</option>
                                    <option value="T4+">T4+</option>
                                </select>
                            </div>

                            <div className="label-container3">
                                <label htmlFor="price" className="label1">Preço *</label>
                                <input
                                    type="number"
                                    placeholder="Preço"
                                    value={price || undefined}
                                    style={{ ...(price === undefined && { borderColor: "red", borderWidth: "5px" }) }}
                                    onChange={(e) => setPrice(e.target.value === '' || parseFloat(e.target.value) < 0 ? undefined : parseFloat(e.target.value))}
                                    min="0" // Ensure the input does not accept negative values
                                    required
                                    title="Indique o custo por mês"
                                />
                            </div>
                            <div className="label-container3">
                                <label htmlFor="area" className="label1">Área *</label>
                                <input
                                    type="number"
                                    placeholder="Área"
                                    value={area || undefined}
                                    style={{ ...(area === undefined && { borderColor: "red", borderWidth: "5px" }) }}
                                    onChange={(e) => setArea(e.target.value === '' || parseFloat(e.target.value) < 0 ? undefined : parseFloat(e.target.value))}
                                    min="0" // Ensure the input does not accept negative values
                                    required
                                    title="Indique a área do quarto (em m^2)"
                                />
                            </div>

                            <div className="label-container3">
                                <label htmlFor="Andar" className="label1">Andar</label>
                                <select
                                    value={andar}
                                    onChange={(e) => setAndar(e.target.value)}

                                    title="Indique o andar onde se encontrar o quarto"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Rés do chão">Rés do chão</option>
                                    <option value="1º">1º andar</option>
                                    <option value="2º">2º andar</option>
                                    <option value="3º">3º andar</option>
                                    <option value="4º">4º andar</option>
                                    <option value="5º">5º andar</option>
                                    <option value="+5ª">+5º andar</option>
                                </select>
                            </div>
                        </div>
                        <div className="location-info-container2">
                            <div className="label-container3">
                                <label htmlFor="gastos" className="label1">Gastos *</label>
                                <select
                                    value={gastos}
                                    onChange={(e) => setGastos(e.target.value)}
                                    style={{ ...(gastos === "" && { borderColor: "red", borderWidth: "5px" }) }}
                                    required
                                    title="Indique se os gastos estão incluidos"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Incluidos">Incluidos</option>
                                    <option value="Não incluidos">Não incluidos</option>
                                </select>
                            </div>

                            <div className="label-container6">
                                <label htmlFor="Animais" className="label1">Animais *</label>
                                <select
                                    value={animais}
                                    onChange={(e) => setAnimais(e.target.value)}
                                    style={{ ...(animais === "" && { borderColor: "red", borderWidth: "5px" }) }}
                                    required
                                    title="Indique se são permitodos animais no alojamento"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Permitidos">Permitidos</option>
                                    <option value="Não permitidos">Não Permitidos</option>
                                </select>
                            </div>

                            <div className="label-container3">
                                <label htmlFor="fumadores" className="label1">Fumadores</label>
                                <select
                                    value={fumadores}
                                    onChange={(e) => setFumadores(e.target.value)}
                                    title="Indique se é permitido fumar dentro do alojamento"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Permitido">Permitido</option>
                                    <option value="Não permitido">Não Permitido</option>
                                </select>
                            </div>

                            <div className="label-container3">
                                <label htmlFor="genero" className="label1">Género *</label>
                                <select
                                    value={genero}
                                    style={{ ...(genero.length == 0 && { borderColor: "red", borderWidth: "5px" }) }}
                                    onChange={(e) => {
                                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                        if (selectedOptions.includes("Indiferente")) {
                                            setGenero(["Masculino", "Feminino"]);
                                            setGenero(["Indiferente"])
                                        } 
                                        else if (selectedOptions.includes("")){
                                            setGenero([]);
                                        }
                                        else {
                                            setGenero(selectedOptions);
                                        }
                                    }}
                                    required
                                    title="Insira os géneros permitidos"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Indiferente">Indiferente</option>
                                </select>
                            </div>

                        </div>

                        <label htmlFor="ambiente" className="label1">Ambiente</label>
                        <input
                            type="text"
                            placeholder="Descreva o ambiente"
                            value={ambiente}
                            onChange={(e) => setAmbiente(e.target.value)}

                            title="Descreva o ambiente"
                        />

                        <label htmlFor="vista" className="label1">Vista</label>
                        <input
                            type="text"
                            placeholder="Descreva a paisagem à sua volta"
                            value={vista}
                            onChange={(e) => setVista(e.target.value)}

                            title="Descreva a vista"
                        />

                        <button type="button" className='button122' onClick={handleClick} style={{ backgroundColor: clicked ? 'green' : 'gray', borderRadius: "10px", marginBottom: "25px", height: "50px", fontSize: "20px" }}>Deseja que o seu Quarto seja avaliado pelos nossos funcionários?</button>
                        <div className='goo'>
                            <button className='button122' type="submit" style={{ width: '50%', height: '60px', fontSize: '30px', borderRadius: "10px" }}>Submit</button>
                        </div>
                        <div style={{ marginTop: "100px" }}>
                            <button
                                className="buttonJoao"
                                id="prev"
                                disabled={step === 1}
                                onClick={() => handleButtonstep(-1)}
                                style={{
                                    float: 'left',
                                    backgroundColor: step === 1 ? '#985353' : '#e1261c', // Grey when disabled, red when enabled
                                    color: '#fff'
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>

            )}
        </div>
    );
}

export default RoomForm;