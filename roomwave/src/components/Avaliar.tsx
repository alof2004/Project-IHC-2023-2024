import React, { useState } from 'react';
import NavBarAvaliador from './NavBarAvaliador';
import '../css/Avaliar.css';

function Avaliar() {
    const responses: string[] = [
        'Muito Fraco',
        'Fraco',
        'Razoável',
        'Bom',
        'Muito Bom'
    ];

    const survey: { scores: number[], statement: string }[] = [
        { scores: [1, 2, 3, 4, 5], statement: 'Limpeza geral do quarto' },
        { scores: [5, 4, 3, 2, 1], statement: 'Morning is when I feel the best' },
        { scores: [1, 2, 3, 4, 5], statement: 'I have crying spells or feel like it' },
        { scores: [1, 2, 3, 4, 5], statement: 'I have trouble sleeping at night' },
        { scores: [5, 4, 3, 2, 1], statement: 'I eat as much as I used to' },
        { scores: [5, 4, 3, 2, 1], statement: 'I still enjoy sex' },
        { scores: [1, 2, 3, 4, 5], statement: 'I notice that I am losing weight' },
        { scores: [1, 2, 3, 4, 5], statement: 'I have trouble with constipation' },
        { scores: [1, 2, 3, 4, 5], statement: 'My heart beats faster than usual' },
        { scores: [1, 2, 3, 4, 5], statement: 'I get tired for no reason' },
        { scores: [5, 4, 3, 2, 1], statement: 'My mind is as clear as it used to be' },
        { scores: [5, 4, 3, 2, 1], statement: 'I find it easy to do the things I used to' },
        { scores: [1, 2, 3, 4, 5], statement: 'I am restless and can\'t keep still' },
        { scores: [5, 4, 3, 2, 1], statement: 'I feel hopeful about the future' },
        { scores: [1, 2, 3, 4, 5], statement: 'I am more irritable than usual' },
        { scores: [5, 4, 3, 2, 1], statement: 'I find it easy to make decisions' },
        { scores: [5, 4, 3, 2, 1], statement: 'I feel that I am useful and needed' },
        { scores: [5, 4, 3, 2, 1], statement: 'My life is pretty full' },
        { scores: [1, 2, 3, 4, 5], statement: 'I feel that others would be better off if I were dead' },
        { scores: [5, 4, 3, 2, 1], statement: 'I still enjoy the things I used to do' }
    ];

    const ranges: { lower: number, upper: number, description: string, stateClass: string, iconClass: string }[] = [
        { lower: 0, upper: 24, description: 'Muito Mau', stateClass: 'badge-danger', iconClass: 'glyphicon-exclamation-sign' },
        { lower: 25, upper: 39, description: 'Mau', stateClass: 'badge-warning', iconClass: 'glyphicon-info-sign' },
        { lower: 40, upper: 54, description: 'Aceitável', stateClass: 'badge-caution', iconClass: 'glyphicon-thumbs-up' },
        { lower: 55, upper: 69, description: 'Bom', stateClass: 'badge-success', iconClass: 'glyphicon-ok-sign' },
        { lower: 70, upper: 80, description: 'Muito Bom', stateClass: 'badge-primary', iconClass: 'glyphicon-star' }
    ];

    const [scores, setScores] = useState<number[]>(Array(survey.length).fill(0));
    const [checks, setChecks] = useState<number>(0);

    const score = (): number => {
        let totalScore: number = 0;
        let totalChecks: number = 0;
    
        scores.forEach((score: number) => {
            totalScore += score;
            totalChecks++;
        });
    
        // Only update checks when necessary
        if (totalChecks !== checks) {
            setChecks(totalChecks);
        }
    
        return totalScore;
    };

    const range = (): { lower: number, upper: number, description: string, stateClass: string, iconClass: string } => {
        const currentScore: number = score();
        return ranges.find(range => range.lower <= currentScore && range.upper >= currentScore) || ranges[0];
    };

    const mailto = (): string => {
        const subject: string = 'Zung Self-Rating Score';
        const body: string = `My Zung Self-Rating Depression Scale Score is ${score()}`;
        return `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <NavBarAvaliador />
            <div className="zung container">
                <div className="page-header">
                    <h1>Zung Self-Rating Depression Scale</h1>
                </div>
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
                        <p>Your score: <strong>{score()}</strong> &nbsp;</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Avaliar;
