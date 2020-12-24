import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  parentDiv: {
    position: 'relative',
    height: '1080px',
  },
  photoCollageDiv: {
    // height: '50%',
    height: '1000px',
  },
  toolbarDiv: {
    position: 'absolute',
    bottom: 0,
  },
});

interface PhotoDialogProps {
  open: boolean;
  selectedPhoto: DisplayedPhoto;
  onClose: (resumePlayback: boolean) => void;
}

const PhotoDialog = (props: PhotoDialogProps) => {

  const { onClose, selectedPhoto, open } = props;

  const handleCloseStayPaused = () => {
    onClose(false);
  };

  const handleCloseResumePlayback = () => {
    onClose(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseResumePlayback}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Eat pizza?'}</DialogTitle>
        <DialogContent>
          <p>Selected photo:</p>
          <p>{selectedPhoto.photoSpec.fileName}</p>
          <p>{selectedPhoto.photoSpec.filePath}</p>
          <p>Width</p>
          <p>{selectedPhoto.width}</p>
          <p>Height</p>
          <p>{selectedPhoto.height}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStayPaused} color='primary'>
            Close
          </Button>
          <Button onClick={handleCloseResumePlayback} color='primary' autoFocus>
            Resume Playback
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const PhotoCollage = (props: PhotoCollageProps) => {

  const [open, setOpen] = React.useState(false);

  const [_selectedPhoto, setSelectedPhoto] = React.useState<DisplayedPhoto | undefined>(undefined);

  const classes = useStyles();

  const handleClose = (resumePlayback: boolean) => {
    console.log('resumePlayback: ', resumePlayback);
    setOpen(false);
    if (resumePlayback) {
      props.onStartPlayback();
    }
  };

  const handleSelectPhoto = (selectedPhoto: DisplayedPhoto) => {
    setSelectedPhoto(selectedPhoto);
    setOpen(true);
  };

  const renderDialog = () => {

    const selectedPhoto: DisplayedPhoto | undefined = _selectedPhoto;

    if (isNil(selectedPhoto)) {
      return null;
    }
    return (
      <PhotoDialog
        selectedPhoto={selectedPhoto}
        open={open}
        onClose={handleClose}
      />
    );

  };

  return (
    <div className={classes.parentDiv}>
      <div className={classes.photoCollageDiv}>
        <PhotoCollageCanvas
          onSelectPhoto={handleSelectPhoto}
        />
        {renderDialog()}
      </div >
      <div className={classes.toolbarDiv}>
        this is a long flibbet
      </div>
    </div>
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
