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

import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import Replay from '@material-ui/icons/Replay';
import FullScreen from '@material-ui/icons/FullScreen';
import FullScreenExit from '@material-ui/icons/FullScreenExit';
import Info from '@material-ui/icons/Info';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import { isNil } from 'lodash';

import {
  PhotoCollageState,
  DisplayedPhoto,
} from '../type';
import PhotoCollageCanvas from './PhotoCollageCanvas';

import {
  startPlayback,
  stopPlayback,
} from '../controller';
import { getPlaybackActive } from '../selector';

// TEDTODO - should there be a component state?
// export interface PhotoCollageComponentState {
//   selectedPhoto: DisplayedPhoto | null;
// }

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

/** @internal */
/** @private */
export interface PhotoCollageProps {
  playbackActive: boolean;
  onStartPlayback: () => any;
  onStopPlayback: () => any;
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
    height: '1020px',   // not clear that this is relevant / used
  },
  /*  
  old approach
     position: 'absolute',
     margin: 'auto',
     width: '200px',
     bottom: 0,
  omitted
    -webkit-transform: 'translateX(-50%)',
  */
  toolbarDiv: {
    position: 'absolute',
    left: '50%',
    bottom: '0px',
    transform: 'translateX(-50%)',
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

  const handlePlay = () => {
    console.log('handlePlay invoked');
    setOpen(false);
    props.onStartPlayback();
  };

  const handlePause = () => {
    console.log('handlePause invoked');
    setSelectedPhoto(undefined);
    setOpen(false);
    props.onStopPlayback();
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

  const getPauseOrPlaybackIcon = () => {
    console.log('getPauseOrPlaybackIcon');
    console.log(props.playbackActive);

    if (props.playbackActive) {
      return (
        <IconButton
          id={'0'}
          onClick={handlePause}>
          <PauseCircleFilled />
        </IconButton>
      );
    }
    else {
      return (
        <IconButton
          id={'1'}
          onClick={handlePlay}>
          <PlayArrow />
        </IconButton>
      );
    }
  };

  const renderToolbar = () => {
    return (
      <div className={classes.toolbarDiv}>
        {getPauseOrPlaybackIcon()}
      </div>
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
      {renderToolbar()}
    </div>
  );

};

function mapStateToProps(state: PhotoCollageState, ownProps: any): Partial<PhotoCollageProps> {
  return {
    playbackActive: getPlaybackActive(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onStartPlayback: startPlayback,
    onStopPlayback: stopPlayback,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCollage);
