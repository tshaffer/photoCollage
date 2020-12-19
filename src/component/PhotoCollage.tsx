import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';

import { isNil } from 'lodash';

import {
  PhotoCollageState,
  DisplayedPhoto,
} from '../type';
import PhotoCollageCanvas from './PhotoCollageCanvas';

import {
  startPlayback,
} from '../controller';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

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

const PhotoCollage = (props: PhotoCollageProps) => {

  const [_showModal, setShowModal] = React.useState(false);
  const [_selectedPhoto, setSelectedPhoto] = React.useState<DisplayedPhoto | undefined>(undefined);

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleCloseModalResumePlayback = () => {
    setShowModal(false);
    props.onStartPlayback();
  }

  const handleSelectPhoto = (selectedPhoto: DisplayedPhoto) => {
    Modal.setAppElement('#collageCanvas');
    setSelectedPhoto(selectedPhoto);
    setShowModal(true);
  }

  const renderDialog = () => {
    if (isNil(_selectedPhoto)) {
      return (
        <div>
          <button onClick={handleCloseModal}>Close Modal</button>
        </div>
      );
    }
    const selectedPhoto: DisplayedPhoto = _selectedPhoto;

    // TEDTODO - are width and height scaled values vs. file values?
    return (
      <div>
        <p>Selected photo:</p>
        <p>{selectedPhoto.photoSpec.fileName}</p>
        <p>{selectedPhoto.photoSpec.filePath}</p>
        <p>Width</p>
        <p>{selectedPhoto.width}</p>
        <p>Height</p>
        <p>{selectedPhoto.height}</p>
        <button onClick={handleCloseModalResumePlayback}>Resume</button>
        <button
          style={{
            marginLeft: '16px'
          }}
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <PhotoCollageCanvas
        onSelectPhoto={handleSelectPhoto}
      />
      <Modal
        isOpen={_showModal}
        contentLabel='Minimal Modal Example'
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 100,
            bottom: 200,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        {renderDialog()}
      </Modal>
        pizza
    </div>
  );

}

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
