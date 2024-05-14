import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBarAvaliador from './NavBarAvaliador';
import '../css/Avaliar.css';
import { parse } from 'path';
import Footer from './footer';

function Avaliar() {
    const { ID } = useParams();
    const parsedID = ID ? parseInt(ID) : undefined;
    const navigate = useNavigate();

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

    const questions = survey.map(item => item.statement);

    const [scores, setScores] = useState<number[]>(Array(survey.length).fill(0));
    const [checks, setChecks] = useState<number>(0);

    const [descricao, setDescricao] = useState('');

    const score = (): number => {
        let totalScore: number = 0;
        let totalChecks: number = 0;
    
        scores.forEach((score: number, index: number) => {
            totalScore += score;
            totalChecks = index + 1; // Increment totalChecks for each question
        });
    
        // Only update checks when necessary
        if (totalChecks !== checks) {
            setChecks(totalChecks);
        }
    
        const averageScore = totalScore / totalChecks;
        return Math.round(averageScore * 10) / 10;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const info = {
            id : parsedID,
            avaliacao : score()
        }
        // Save the room ID and score to local storage
        console.log(info);

        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        const roomIndex = roomsData.findIndex((room: any) => room.id === parsedID);

        console.log('Room index:', roomIndex);
        console.log('ID:', ID);

        if (roomIndex !== -1) {
            // If room with the same ID is found, update avaliado and avaliacao
            roomsData.Avaliado = 'Sim';
            roomsData.Avaliacao = info.avaliacao;
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
            scores: scores,
            questions: questions,
            descricao: descricao
        };

        const detailedEval = JSON.parse(localStorage.getItem('detailedEval') || '[]');
        detailedEval.push(avals)
        localStorage.setItem('detailedEval', JSON.stringify(detailedEval));

        console.log('New room added:', info);
        navigate("../../homeAvaliador");

    };

    return (
        <>
            <NavBarAvaliador />
            <div className="zung-container">
                <form className="aaa" onSubmit={handleSubmit}> {/* Adding onSubmit handler to the form */}
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
                                            <input required type="radio" name={`q${index + 1}`} value={score} onChange={(e) => {
                                                const updatedScores = [...scores];
                                                updatedScores[index] = parseInt(e.target.value);
                                                setScores(updatedScores);
                                            }} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="descricao-label-container">
                        <label htmlFor="descricao" className="descricao-label">Comentários adicionais:</label>
                        <textarea
                            id="descricao"
                            placeholder="Comentários adicionais..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="descricao-input"
                            title="Insira aqui uma descrição do quarto"
                        />
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Avaliação</h3>
                        </div>
                        <div className="panel-body">
                            <p className='panel-tilte'>Avaliação média do quarto: <strong>{score()}</strong> &nbsp;</p>
                            <button className="btn btn-primary" type="submit">Submeter Avaliação</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Avaliar;
