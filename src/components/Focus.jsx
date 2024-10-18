import { Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Focus.css";

export function OffCanvasFocus({ children, onOpen, onClose }) {
  return (
    <>
      <Offcanvas show={onOpen} onHide={onClose} className="offcanvas-custom">
        <Offcanvas.Header closeButton className="offcanvas-header-custom">
          <Offcanvas.Title className="offcanvas-title-custom">
            Add Task
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body-custom">
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
