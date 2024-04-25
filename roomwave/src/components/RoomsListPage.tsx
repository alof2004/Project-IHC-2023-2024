import React, { useEffect, useState } from 'react';
import '../css/RoomsListPage.css';
function RoomsListPage() {
    const [lastSegment, setLastSegment] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const segment = url.substring(url.lastIndexOf('/') + 1);
        const decodedRoomName = decodeURIComponent(segment);
        setLastSegment(decodedRoomName);
    }, []);


    return (
        <div>
            <h1>Quartos em: {lastSegment}</h1>
            <div className="projcard-container">
                <div className="projcard projcard-blue">
                    <div className="projcard-innerbox">
                        <img className="projcard-img" src="../src/images/quarto1_3.jpg" />
                        <div className="projcard-textbox">
                            <div className="projcard-title">Quarto 1</div>
                            <div className="projcard-subtitle">Rua do Rio, Aveiro</div>
                            <div className="projcard-bar"></div>
                            <div className="projcard-description">Sei lá.</div>
                            <div className="projcard-tagbox">
                                <span className="projcard-tag">HTML</span>
                                <span className="projcard-tag">CSS</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="projcard projcard-red">
                    <div className="projcard-innerbox">
                        <img className="projcard-img" src="../src/images/quarto1_2.jpg" />
                        <div className="projcard-textbox">
                            <div className="projcard-title">Quarto 2</div>
                            <div className="projcard-subtitle">Rua da Ria, Aveiro</div>
                            <div className="projcard-bar"></div>
                            <div className="projcard-description">Não sei.</div>
                            <div className="projcard-tagbox">
                                <span className="projcard-tag">PHP</span>
                                <span className="projcard-tag">SQL</span>
                                <span className="projcard-tag">Database</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="projcard projcard-green">
                    <div className="projcard-innerbox">
                        <img className="projcard-img" src="https://picsum.photos/800/600?image=1039" />
                        <div className="projcard-textbox">
                            <div className="projcard-title">And a Third Card</div>
                            <div className="projcard-subtitle">You know what this is by now</div>
                            <div className="projcard-bar"></div>
                            <div className="projcard-description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</div>
                            <div className="projcard-tagbox">
                                <span className="projcard-tag">Excel</span>
                                <span className="projcard-tag">VBA</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default RoomsListPage;
