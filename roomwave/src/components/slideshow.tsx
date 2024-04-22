
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import details from './rooms.json';

const Example = () => {
    const imagem1 = details[0].imagens;
    const imagem2 = details[1].imagens;
    const imagem3 = details[2].imagens;
    const imagem4 = details[3].imagens;

    const images = [
        imagem1,
        imagem2,
        imagem3,
        imagem4
    ];

    return (
        <Slide>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <span>Slide 1</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <span>Slide 2</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <span>Slide 3</span>
                </div>
            </div>
        </Slide>
    );
};

export default Example;