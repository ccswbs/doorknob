import React, { useState } from "react"
import ReactPlayer from "react-player"
import { Modal, CloseButton } from "react-bootstrap"
import "../../styles/modalVideo.css"

function ModalVideo (props) {
  const modalId = `modal-${props.id}`;
  const videoSrc = props.src;
  const videoTitle = props.title;
  const videoTranscript = props.transcript;

  const [show, setShow] = useState(false);    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return videoSrc ? (
    <div id={modalId} className="modal-video">
        {props.modalButton ?
          React.cloneElement(props.modalButton, { onClick: handleShow })
          : 
          <button type="button" className="play" onClick={handleShow}>
            <i className="fad fa-play-circle" aria-hidden="true"></i>
            <span className="visually-hidden">Play video: {videoTitle}</span>
          </button>
        }

        <Modal dialogClassName="modal-dialog-centered" show={show} size="lg" onHide={handleClose}>
            <Modal.Header className="bg-dark border-bottom-0">
                <Modal.Title className="fw-normal text-white m-0">{videoTitle}</Modal.Title>
                <CloseButton variant="white" aria-label="Close video" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div className="ratio ratio-16x9">
                    <ReactPlayer url={videoSrc} width="100%" height="100%" controls playing={show} />
                </div>                
            </Modal.Body>
            <Modal.Footer className="bg-dark border-top-0">
                {videoTranscript && <a className="btn btn-primary w-100" href={videoTranscript}>Download transcript<span className="visually-hidden"> for {videoTitle + " video"}</span></a>}
            </Modal.Footer>
        </Modal>
    </div>
  ) : null
}

export default ModalVideo