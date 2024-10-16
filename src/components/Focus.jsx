
import { Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export function OffCanvasFocus({ children,onOpen,onClose}) {



  return (
    <>
      <Offcanvas show={onOpen} onHide={onClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>AddTask</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>

  );
}


