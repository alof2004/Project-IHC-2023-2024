import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBarAvaliador from './NavBarAvaliador';
import '../css/Avaliar.css';
import Footer from './footer';
import rooms from './rooms.json';

function Avaliar() {
    interface Room {
        id: number;
        Rating?: number[];
    }

    const { ID } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState<Room | null>(null);
    const [descricao, setDescricao] = useState('A very nice room with good amenities.');

    // Fetch room details
    useEffect(() => {
        const parsedID = parseInt(ID!);
        const detailedEval = JSON.parse(localStorage.getItem('detailedEval') || '[]');
        const storedRoom = detailedEval.find((r: any) => r.id === parsedID);

        if (storedRoom) {
            setRoom({ id: storedRoom.id, Rating: storedRoom.scores });
        } else {
            const roomDetails = rooms.find(r => r.id === parsedID);
            if (roomDetails) {
                setRoom(roomDetails);
            }
        }
    }, [ID]);


    const responses: string[] = [
        'Muito Fraco',
        'Fraco',
        'Razoável',
        'Bom',
        'Muito Bom'
    ];

    const survey: { scores: number[], statement: string }[] = [
        { scores: [1, 2, 3, 4, 5], statement: 'Limpeza geral do quarto' },
        { scores: [1, 2, 3, 4, 5], statement: 'Qualidade da iluminação' },
        { scores: [1, 2, 3, 4, 5], statement: 'Qualidade dos móveis' },
        { scores: [1, 2, 3, 4, 5], statement: 'Qualidade da vista a partir do quarto' },
        { scores: [1, 2, 3, 4, 5], statement: 'Facilidade de acesso a tomadas elétricas no quarto' },
        { scores: [1, 2, 3, 4, 5], statement: 'Nível de privacidade no quarto' },
        { scores: [1, 2, 3, 4, 5], statement: 'Condição e limpeza da(s) casa(s) de banho' },
        { scores: [1, 2, 3, 4, 5], statement: 'Segurança (trancas, segurança contra incêndios, etc...)' },
        { scores: [1, 2, 3, 4, 5], statement: 'Qualidade do isolamento acústico' },
        { scores: [1, 2, 3, 4, 5], statement: 'Poluição sonora exterior (rua)' },
        { scores: [1, 2, 3, 4, 5], statement: 'Quantidade de luz natural' },
        { scores: [1, 2, 3, 4, 5], statement: 'Facilidade de ajuste e controle da temperatura da água' },
        { scores: [1, 2, 3, 4, 5], statement: 'Conforto das (cadeira(s),cama(s),sofá(s),etc...)' },
    ];

    // Calculate average score
    const score = (): number => {
        if (!room) return 0;

        let totalScore: number = 0;
        room.Rating.forEach((score: number) => {
            totalScore += score;
        });

        const averageScore = totalScore / room.Rating.length;
        return Math.round(averageScore * 10) / 10;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parsedID = parseInt(ID!);
        const info = {
            id: parsedID,
            avaliacao: score()
        };

        // Save the room ID and score to local storage
        console.log(info);

        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        const roomIndex = roomsData.findIndex((room: any) => room.id === parsedID);

        if (roomIndex !== -1) {
            // If room with the same ID is found, update avaliado and avaliacao
            roomsData[roomIndex].Avaliado = 'Sim';
            roomsData[roomIndex].Avaliacao = info.avaliacao;
            localStorage.setItem('roomsData', JSON.stringify(roomsData));
            const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
            avaliados.push(info);
            localStorage.setItem('avaliados', JSON.stringify(avaliados));
        } else {
            // If room with the same ID is not found, add it to avaliados
            const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
            avaliados.push(info);
            localStorage.setItem('avaliados', JSON.stringify(avaliados));
        }

        const avals = {
            id: parsedID,
            scores: room?.Rating,
            questions: survey.map(item => item.statement),
            descricao: descricao
        };

        const detailedEval = JSON.parse(localStorage.getItem('detailedEval') || '[]');
        detailedEval.push(avals);
        localStorage.setItem('detailedEval', JSON.stringify(detailedEval));

        console.log('New room added:', info);
        navigate("../../homeAvaliador");
    };
    return (
        <>
            <div className="zung-container">
            <style>{`
                    .panel-body p {
                        font-size: 20px;
                        text-align: center;
                        color: #FF7A41;
                    }
                    .response-number {
                        color: #FF7A41;
                    }
                    
                `}</style>
                <form className="aab" onSubmit={handleSubmit}>
                    <h2>Formulário de avaliação do Quarto</h2>
                    <table className="table table-striped table-hover table-responsive">
                        <thead>
                            <tr>
                                <th colSpan={2}>Check the appropriate column</th>
                                {responses.map((response, index) => <th key={index} className="response">{response}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {survey.map((s, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{s.statement}</td>
                                    {s.scores.map((score, i) => (
                                        <td key={i} className="response">
                                            {room && room.Rating[index] === score ? (
                                                <span className="numeros" >&#10003;</span>
                                            ) : null}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                        </div>
                        <div className="panel-body">
                            <p className='panel-tilte'>Avaliação média do quarto: <strong>{score()}</strong> &nbsp;</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Avaliar;
