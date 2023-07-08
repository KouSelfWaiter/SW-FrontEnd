import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PropsWithChildren } from 'react'

interface IProps{
    show:boolean
    onHide:() => void;
    title:string
    bodyTitle:string

   
}

function CustomDialog({ show, onHide, title, bodyTitle, children }:PropsWithChildren<IProps>) {
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bodyTitle}
          {children ? children : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default CustomDialog