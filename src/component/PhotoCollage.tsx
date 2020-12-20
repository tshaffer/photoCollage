// import * as React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Modal from 'react-modal';

// import { isNil } from 'lodash';

// import {
//   PhotoCollageState,
//   DisplayedPhoto,
// } from '../type';
// import PhotoCollageCanvas from './PhotoCollageCanvas';

// import {
//   startPlayback,
// } from '../controller';

// export interface PhotoCollageComponentState {
//   showModal: boolean;
//   selectedPhoto: DisplayedPhoto | null;
// }

// // -----------------------------------------------------------------------
// // Types
// // -----------------------------------------------------------------------

// /** @internal */
// /** @private */
// export interface PhotoCollageProps {
//   onStartPlayback: () => any;
// }

// // -----------------------------------------------------------------------
// // Component
// // -----------------------------------------------------------------------

// const PhotoCollage = (props: PhotoCollageProps) => {

//   const [_showModal, setShowModal] = React.useState(false);
//   const [_selectedPhoto, setSelectedPhoto] = React.useState<DisplayedPhoto | undefined>(undefined);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleCloseModalResumePlayback = () => {
//     setShowModal(false);
//     props.onStartPlayback();
//   };

//   const handleSelectPhoto = (selectedPhoto: DisplayedPhoto) => {
//     Modal.setAppElement('#collageCanvas');
//     setSelectedPhoto(selectedPhoto);
//     setShowModal(true);
//   };

//   const renderDialog = () => {
//     if (isNil(_selectedPhoto)) {
//       return (
//         <div>
//           <button onClick={handleCloseModal}>Close Modal</button>
//         </div>
//       );
//     }
//     const selectedPhoto: DisplayedPhoto = _selectedPhoto;

//     // TEDTODO - are width and height scaled values vs. file values?
//     return (
//       <div>
//         <p>Selected photo:</p>
//         <p>{selectedPhoto.photoSpec.fileName}</p>
//         <p>{selectedPhoto.photoSpec.filePath}</p>
//         <p>Width</p>
//         <p>{selectedPhoto.width}</p>
//         <p>Height</p>
//         <p>{selectedPhoto.height}</p>
//         <button onClick={handleCloseModalResumePlayback}>Resume</button>
//         <button
//           style={{
//             marginLeft: '16px'
//           }}
//           onClick={handleCloseModal}
//         >
//           Close
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <PhotoCollageCanvas
//         onSelectPhoto={handleSelectPhoto}
//       />
//       <Modal
//         isOpen={_showModal}
//         contentLabel='Minimal Modal Example'
//         style={{
//           overlay: {
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 100,
//             bottom: 200,
//             backgroundColor: 'rgba(255, 255, 255, 0.75)'
//           },
//           content: {
//             position: 'absolute',
//             top: '40px',
//             left: '40px',
//             right: '40px',
//             bottom: '40px',
//             border: '1px solid #ccc',
//             background: '#fff',
//             overflow: 'auto',
//             WebkitOverflowScrolling: 'touch',
//             borderRadius: '4px',
//             outline: 'none',
//             padding: '20px'
//           }
//         }}
//       >
//         {renderDialog()}
//       </Modal>
//         pizza
//     </div>
//   );

// };

// function mapStateToProps(state: PhotoCollageState, ownProps: any) {
//   return {
//   };
// }

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators({
//     onStartPlayback: startPlayback,
//   }, dispatch);
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PhotoCollage);

// const PhotoCollage = (): any => {

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// const PhotoCollage = (): any => {

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant='outlined' color='primary' onClick={handleClickOpen}>
//         Open alert dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='alert-dialog-title'
//         aria-describedby='alert-dialog-description'
//       >
//         <DialogTitle id='alert-dialog-title'>{'Use Google's location service?'}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id='alert-dialog-description'>
//             Let Google help apps determine location. This means sending anonymous location data to
//             Google, even when no apps are running.
//           </DialogContentText>
//           <DialogContentText id='second-text-field'>
//             Pizza is my favorite food.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color='primary'>
//             Disagree
//           </Button>
//           <Button onClick={handleClose} color='primary' autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default PhotoCollage;

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { blue } from '@material-ui/core/colors';

import { isNil } from 'lodash';

import {
  PhotoCollageState,
  DisplayedPhoto,
} from '../type';
import PhotoCollageCanvas from './PhotoCollageCanvas';

import {
  startPlayback,
} from '../controller';

export interface PhotoCollageComponentState {
  showModal: boolean;
  selectedPhoto: DisplayedPhoto | null;
}

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

/** @internal */
/** @private */
export interface PhotoCollageProps {
  onStartPlayback: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

interface PhotoDialogProps {
  open: boolean;
  selectedValue: DisplayedPhoto;
  onClose: (value: DisplayedPhoto) => void;
}

const PhotoDialog = (props: PhotoDialogProps) => {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Eat pizza?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
          <DialogContentText id='eat pizza - description'>
            Eat more pizza
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const PhotoCollage = (props: PhotoCollageProps) => {

  const [open, setOpen] = React.useState(false);

  const [_selectedPhoto, setSelectedPhoto] = React.useState<DisplayedPhoto | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectPhoto = (selectedPhoto: DisplayedPhoto) => {
    setSelectedPhoto(selectedPhoto);
    setOpen(true);
  };

  const renderDialog = () => {
    // if (isNil(_selectedPhoto)) {
    //   return (
    //     <div>
    //       <button onClick={handleCloseModal}>Close Modal</button>
    //     </div>
    //   );
    // }
    const selectedPhoto: DisplayedPhoto | undefined = _selectedPhoto;

    if (isNil(selectedPhoto)) {
      return null;
    }
    return (
      <PhotoDialog
        selectedValue={selectedPhoto}
        open={open}
        onClose={handleClose}
      />
    )

  };

  return (
    <div>
      <PhotoCollageCanvas
        onSelectPhoto={handleSelectPhoto}
      />
      {renderDialog()}
      pizza
    </div >
  );

};

function mapStateToProps(state: PhotoCollageState, ownProps: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onStartPlayback: startPlayback,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCollage);
