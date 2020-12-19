import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isNil } from 'lodash';

import { photoCollageConfig } from '../config';

import {
  PhotoCollageState,
  PhotoCollageSpec,
  PhotoCollection,
  DisplayedPhoto,
  PhotoInCollageSpec,
} from '../type';
import {
  startPlayback,
  stopPlayback,
} from '../controller';

import {
  getActivePhotoCollageSpec,
  getPhotoCollection,
  getPhotosInCollage
} from '../selector';

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

/** @internal */
/** @private */
export interface PhotoCollageCanvasPropsFromParent {
  onSelectPhoto: any;
}

/** @internal */
/** @private */
export interface PhotoCollageCanvasComponentState {
  selectedPhoto: DisplayedPhoto | null;
}

/** @internal */
/** @private */
export interface PhotoCollageCanvasProps extends PhotoCollageCanvasPropsFromParent {
  photoCollection: PhotoCollection;
  photoCollageSpec: PhotoCollageSpec | null;
  photosInCollage: PhotoInCollageSpec[];
  onStartPlayback: () => any;
  onStopPlayback: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

let canvasRef: any;
let ctx: any;
let photoImages: DisplayedPhoto[] = [];

const PhotoCollageCanvas = (props: PhotoCollageCanvasProps) => {

  // const [_selectedPhoto, setSelectedPhoto] = React.useState<DisplayedPhoto | undefined>(undefined);

  React.useEffect(() => {
    canvasRef = null;
    ctx = null;
    photoImages = [];
    props.onStartPlayback();
  }, []);

  const setCanvasRef = (element: any) => {
    if (!isNil(element)) {
      canvasRef = element;
      ctx = element.getContext('2d');
    } else {
      console.log('setCanvasRef invoked, element is null');
    }
  }

  const renderPhoto = (filePath: string, x: number, y: number, width: number, height: number) => {
    const photo = new Image();
    photo.onload = () => {
      scaleToFit(photo, x, y, width, height);
    };
    photo.src = filePath;
  }

  const scaleToFit = (photo: any, xOnCanvas: number, yOnCanvas: number, widthOnCanvas: number, heightOnCanvas: number) => {
    const scale = Math.min(widthOnCanvas / photo.width, heightOnCanvas / photo.height);
    const x = (widthOnCanvas / 2) - (photo.width / 2) * scale;
    const y = (heightOnCanvas / 2) - (photo.height / 2) * scale;
    ctx.drawImage(photo, x + xOnCanvas, y + yOnCanvas, photo.width * scale, photo.height * scale);
  }

  const getScaledCoordinates = (x: number, y: number, width: number, height: number, collageWidth: number, collageHeight: number, screenWidth: number, screenHeight: number): any => {
    const screenX = (x / collageWidth) * screenWidth;
    const screenY = (y / collageHeight) * screenHeight;
    return {
      x: screenX,
      y: screenY,
      width: (width / collageWidth) * screenWidth,
      height: (height / collageHeight) * screenHeight,
    };
  }

  const handleClick = (e: any) => {

    const elem = canvasRef;
    const elemLeft = elem.offsetLeft + elem.clientLeft;
    const elemTop = elem.offsetTop + elem.clientTop;

    const x = e.pageX - elemLeft;
    const y = e.pageY - elemTop;

    for (const photoImage of photoImages) {
      if (y > photoImage.y && y < photoImage.y + photoImage.height
        && x > photoImage.x && x < photoImage.x + photoImage.width) {
        props.onStopPlayback();
        props.onSelectPhoto(photoImage);
        return;
      }
    }

    // setSelectedPhoto(null);
  }

  const renderPhotosInCollage = () => {

    const photosInCollage: PhotoInCollageSpec[] = props.photosInCollage;
    if (photosInCollage.length === 0) {
      return;
    }

    photoImages = [];
    const { collageWidth, collageHeight, photosInCollageSpecs } = props.photoCollageSpec!;
    let index = 0;
    for (const photosInCollageSpec of photosInCollageSpecs) {
      const { x, y, width, height } = photosInCollageSpec;

      if (!isNil(photosInCollage[index].filePath)) {
        const filePath = photosInCollage[index].filePath!;

        const screenCoordinates = getScaledCoordinates(x, y, width, height, collageWidth, collageHeight, photoCollageConfig.width, photoCollageConfig.height);

        photoImages.push({
          x: screenCoordinates.x,
          y: screenCoordinates.y,
          width: screenCoordinates.width,
          height: screenCoordinates.height,
          photoSpec: photosInCollage[index],
        });

        renderPhoto(
          'file:///' + filePath,
          screenCoordinates.x,
          screenCoordinates.y,
          screenCoordinates.width,
          screenCoordinates.height);
      }

      index++;
    }
  }

  const renderPhotoCollage = () => {
    if (isNil(props.photoCollageSpec) ||
      isNil(props.photoCollection) ||
      isNil(props.photoCollection!.photosInCollection) ||
      props.photoCollection.photosInCollection.length === 0) {
      return;
    }
    renderPhotosInCollage();
  }

  if (!isNil(canvasRef) && !isNil(ctx)) {
    const context = ctx;
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvasRef.width, canvasRef.height);
    renderPhotoCollage();
  }

  return (
    <div>
      <canvas
        id='collageCanvas'
        width={photoCollageConfig.width.toString()}
        height={photoCollageConfig.height.toString()}
        ref={setCanvasRef}
        onClick={handleClick}
      />
    pizza
    </div>
  );
}

function mapStateToProps(state: PhotoCollageState, ownProps: PhotoCollageCanvasPropsFromParent): Partial<PhotoCollageCanvasProps> {
  return {
    photoCollection: getPhotoCollection(state),
    photoCollageSpec: getActivePhotoCollageSpec(state),
    photosInCollage: getPhotosInCollage(state),
    onSelectPhoto: ownProps.onSelectPhoto,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onStartPlayback: startPlayback,
    onStopPlayback: stopPlayback,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCollageCanvas);

// class PhotoCollageCanvasComponent extends React.Component<
//   PhotoCollageCanvasProps,
//   PhotoCollageCanvasComponentState
//   > {

//   canvasRef: any;
//   setCanvasRef: any;
//   ctx: any;
//   photoImages: DisplayedPhoto[];

//   constructor(props: any) {
//     super(props);

//     this.state = {
//       selectedPhoto: null,
//     };

//     this.photoImages = [];

//     this.setCanvasRef = (element: any) => {
//       this.canvasRef = element;
//       this.ctx = element.getContext('2d');
//     };

//     this.handleClick = this.handleClick.bind(this);
//   }

//   componentDidMount() {
//     this.props.onStartPlayback();
//   }

//   renderPhoto(filePath: string, x: number, y: number, width: number, height: number) {
//     const photo = new Image();
//     photo.onload = () => {
//       this.scaleToFit(photo, x, y, width, height);
//     };
//     photo.src = filePath;
//   }

//   scaleToFit(photo: any, xOnCanvas: number, yOnCanvas: number, widthOnCanvas: number, heightOnCanvas: number) {
//     const scale = Math.min(widthOnCanvas / photo.width, heightOnCanvas / photo.height);
//     const x = (widthOnCanvas / 2) - (photo.width / 2) * scale;
//     const y = (heightOnCanvas / 2) - (photo.height / 2) * scale;
//     this.ctx.drawImage(photo, x + xOnCanvas, y + yOnCanvas, photo.width * scale, photo.height * scale);
//   }

//   getScaledCoordinates(x: number, y: number, width: number, height: number, collageWidth: number, collageHeight: number, screenWidth: number, screenHeight: number): any {
//     const screenX = (x / collageWidth) * screenWidth;
//     const screenY = (y / collageHeight) * screenHeight;
//     return {
//       x: screenX,
//       y: screenY,
//       width: (width / collageWidth) * screenWidth,
//       height: (height / collageHeight) * screenHeight,
//     };
//   }

//   handleClick(e: any) {

//     const elem = this.canvasRef;
//     const elemLeft = elem.offsetLeft + elem.clientLeft;
//     const elemTop = elem.offsetTop + elem.clientTop;

//     const x = e.pageX - elemLeft;
//     const y = e.pageY - elemTop;

//     for (const photoImage of this.photoImages) {
//       if (y > photoImage.y && y < photoImage.y + photoImage.height
//         && x > photoImage.x && x < photoImage.x + photoImage.width) {
//         this.props.onStopPlayback();
//         this.props.onSelectPhoto(photoImage);
//         return;
//       }
//     }

//     this.setState({
//       selectedPhoto: null,
//     });
//   }

//   renderPhotosInCollage() {

//     const photosInCollage: PhotoInCollageSpec[] = this.props.photosInCollage;
//     if (photosInCollage.length === 0) {
//       return;
//     }

//     this.photoImages = [];
//     const { collageWidth, collageHeight, photosInCollageSpecs } = this.props.photoCollageSpec!;
//     let index = 0;
//     for (const photosInCollageSpec of photosInCollageSpecs) {
//       const { x, y, width, height } = photosInCollageSpec;

//       if (!isNil(photosInCollage[index].filePath)) {
//         const filePath = photosInCollage[index].filePath!;

//         const screenCoordinates = this.getScaledCoordinates(x, y, width, height, collageWidth, collageHeight, photoCollageConfig.width, photoCollageConfig.height);

//         this.photoImages.push({
//           x: screenCoordinates.x,
//           y: screenCoordinates.y,
//           width: screenCoordinates.width,
//           height: screenCoordinates.height,
//           photoSpec: photosInCollage[index],
//         });

//         this.renderPhoto(
//           'file:///' + filePath,
//           screenCoordinates.x,
//           screenCoordinates.y,
//           screenCoordinates.width,
//           screenCoordinates.height);
//       }

//       index++;
//     }
//   }

//   renderPhotoCollage() {
//     if (isNil(this.props.photoCollageSpec) ||
//       isNil(this.props.photoCollection) ||
//       isNil(this.props.photoCollection!.photosInCollection) ||
//       this.props.photoCollection.photosInCollection.length === 0) {
//       return;
//     }
//     this.renderPhotosInCollage();
//   }

//   render() {

//     if (!isNil(this.canvasRef) && !isNil(this.ctx)) {
//       const context = this.ctx;
//       context.imageSmoothingEnabled = false;
//       context.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
//       this.renderPhotoCollage();
//     }

//     return (
//       <div>
//         <canvas
//           id='collageCanvas'
//           width={photoCollageConfig.width.toString()}
//           height={photoCollageConfig.height.toString()}
//           ref={this.setCanvasRef}
//           onClick={this.handleClick}
//         />
//         pizza
//       </div>
//     );
//   }
// }

// -----------------------------------------------------------------------
// Container
// -----------------------------------------------------------------------

// function mapStateToProps(state: PhotoCollageState, ownProps: PhotoCollageCanvasPropsFromParent): Partial<PhotoCollageCanvasProps> {
//   return {
//     photoCollection: getPhotoCollection(state),
//     photoCollageSpec: getActivePhotoCollageSpec(state),
//     photosInCollage: getPhotosInCollage(state),
//     onSelectPhoto: ownProps.onSelectPhoto,
//   };
// }

// onStartPlayback: startPlayback,
// onStopPlayback: stopPlayback,

// export const PhotoCollageCanvas = connect(mapStateToProps, mapDispatchToProps)(PhotoCollageCanvasComponent);
