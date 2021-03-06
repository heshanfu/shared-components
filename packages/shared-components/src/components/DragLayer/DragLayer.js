import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer as LibDragLayer } from 'react-dnd';
import DragItemPreviewContainer from './styles/DragItemPreviewContainer';
import DragLayerOverlay from './styles/DragLayerOverlay';
import { DragContext } from 'components/DragContainer';
import { identity } from 'lodash';

/**
 * Renders a generic layer for drawing dragged items from draggable
 * components.
 */
class DragLayer extends React.Component {
  static propTypes = {
    /**
     * Provided by DragGroupItem via drag context.
     * Contains details needed to render an item preview
     */
    item: PropTypes.shape({
      children: PropTypes.node,
      dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
    /**
     * Provided by
     * Offset values for the position of the dragged preview
     * item
     */
    clientOffset: PropTypes.object,

    /**
     * Override the presentational component which renders the full-screen
     * overlay
     */
    Overlay: PropTypes.func,
    /**
     * Override the presentational component which positions and sizes
     * the preview element
     */
    PreviewContainer: PropTypes.func,
  };

  static defaultProps = {
    item: null,
    clientOffset: null,
    Overlay: DragLayerOverlay,
    PreviewContainer: DragItemPreviewContainer,
  };

  renderPreviewContent = () => {
    const { item } = this.props;

    return (
      item.children &&
      React.Children.map(
        item.children,
        child =>
          child
            ? React.cloneElement(child, { wrapDragHandle: identity })
            : null,
      )
    );
  };

  render() {
    const {
      item,
      clientOffset,
      Overlay,
      PreviewContainer,
      Cutout,
    } = this.props;

    if (!item || !clientOffset) {
      return <Overlay />;
    }

    const previewPositionStyles = {
      transform: `translate(${clientOffset.x}px, ${clientOffset.y}px)`,
      width: item.dimensions ? item.dimensions.width + 'px' : '0px',
      height: item.dimensions ? item.dimensions.height + 'px' : '0px',
    };

    return (
      <DragContext.Provider value={{ wrapDragHandle: identity }}>
        <Overlay>
          <div style={previewPositionStyles}>
            <PreviewContainer>{this.renderPreviewContent()}</PreviewContainer>
          </div>
        </Overlay>
      </DragContext.Provider>
    );
  }
}

const collect = monitor => ({
  item: monitor.getItem(),
  clientOffset: monitor.getClientOffset(),
});

export default LibDragLayer(collect)(DragLayer);
