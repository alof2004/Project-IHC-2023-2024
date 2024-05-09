import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBarAvaliador from './NavBarAvaliador';
import '../css/Avaliar.css';

function Avaliar() {
    const { ID } = useParams();
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

    const [scores, setScores] = useState<number[]>(Array(survey.length).fill(0));
    const [checks, setChecks] = useState<number>(0);

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
            id : ID,
            avaliacao : score()
        }
        // Save the room ID and score to local storage
        console.log(info);
        const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
        avaliados.push(info);
        localStorage.setItem('avaliados', JSON.stringify(avaliados)); // Save updated data to local storage
        console.log('New room added:', info);
        navigate("../../homeAvaliador");
    };

    return (
        <>
            <NavBarAvaliador />
            <div className="zung container">
                <div className="page-header">
                    <h1>Formulário de avaliação do Quarto</h1>
                </div>
                <form onSubmit={handleSubmit}> {/* Adding onSubmit handler to the form */}
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
                                            <input type="radio" name={`q${index + 1}`} value={score} onChange={(e) => {
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
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Score</h3>
                        </div>
                        <div className="panel-body">
                            <p>Room final score: <strong>{score()}</strong> &nbsp;</p>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Avaliar;
