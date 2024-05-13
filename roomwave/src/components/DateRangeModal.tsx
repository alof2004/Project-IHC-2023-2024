import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeModal = ({ isOpen, onClose, onDatesChange }: { isOpen: boolean, onClose: () => void, onDatesChange: (dates: any) => void }) => {
    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Selecione o intervalo de datas</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <DateRangePicker
                            onChange={onDatesChange}
                            ranges={[{ startDate: new Date(), endDate: new Date() }]}
                        />
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-primary" onClick={onClose}>Fechar</button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default DateRangeModal;
