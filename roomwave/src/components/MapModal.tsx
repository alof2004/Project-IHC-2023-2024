import { DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';
import { JSX } from 'react/jsx-runtime';
import MyMapApp from './Map';
function MapModal(props: JSX.IntrinsicAttributes & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & { ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode; }) {
    const {city} = useParams(); 
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{minWidth: '100vw', minHeight: '100vh'}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Mapa de {city}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyMapApp />
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:"#FF7A41", borderColor:"#FF7A41"}}onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapModal;
