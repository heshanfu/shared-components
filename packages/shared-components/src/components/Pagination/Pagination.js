import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import PaginationContainer from './styles/PaginationContainer';
import PaginationItem from './styles/PaginationItem';
import PaginationItemPlaceholder from './styles/PaginationItemPlaceholder';

class Pagination extends React.Component {
  static propTypes = {
    /**
     * The number of total pages available.
     */
    pageCount: PropTypes.number,
    /**
     * The currently selected page index.
     */
    currentPage: PropTypes.number,
    /**
     * A callback for page selection. The callback is passed the new selected page index.
     */
    onPageSelected: PropTypes.func.isRequired,
    /**
     * Adds a class name to the pagination container element.
     */
    className: PropTypes.string,
    /**
     * Adds an id to the pagination container element.
     */
    id: PropTypes.string,
    /**
     * A component to render a container for the pagination
     */
    Container: PropTypes.func,
    /**
     * A component to render a single pagination item
     */
    Item: PropTypes.func,
    /**
     * A component to render a placeholder space for a pagination item
     */
    ItemPlaceholder: PropTypes.func,
  };

  static defaultProps = {
    pageCount: 1,
    currentPage: 0,
    className: null,
    id: null,
    Container: PaginationContainer,
    Item: PaginationItem,
    ItemPlaceholder: PaginationItemPlaceholder,
  };

  createItemClickHandler = index => () => this.props.onPageSelected(index);

  handlePreviousClick = () => {
    const { onPageSelected, currentPage } = this.props;
    if (currentPage === 0) {
      return;
    }
    onPageSelected(currentPage - 1);
  };

  handleNextClick = () => {
    const { onPageSelected, currentPage, pageCount } = this.props;
    if (currentPage === pageCount - 1) {
      return;
    }

    onPageSelected(currentPage + 1);
  };

  renderPrevious = () =>
    this.props.currentPage > 0 ? (
      <this.props.Item onClick={this.handlePreviousClick}>
        <Icon name="back" />
      </this.props.Item>
    ) : (
      <this.props.ItemPlaceholder />
    );

  renderNext = () =>
    this.props.currentPage < this.props.pageCount - 1 ? (
      <this.props.Item onClick={this.handleNextClick}>
        <Icon name="forward" />
      </this.props.Item>
    ) : (
      <this.props.ItemPlaceholder />
    );

  renderItems = () => {
    const { pageCount, currentPage, Item } = this.props;
    const start = Math.max(0, Math.min(currentPage + 5, pageCount) - 10);
    const end = Math.min(start + 10, pageCount);
    return (
      new Array(pageCount)
        .fill(null)
        // creates an array of incrementing numbers
        .map((_, index) => index)
        .slice(start, end)
        .map(pageNumber => (
          <Item
            key={pageNumber}
            onClick={this.createItemClickHandler(pageNumber)}
            selected={pageNumber === currentPage}
          >
            {pageNumber + 1}
          </Item>
        ))
    );
  };

  render() {
    const { id, className, Container } = this.props;
    return (
      <Container id={id} className={className}>
        {this.renderPrevious()}
        {this.renderItems()}
        {this.renderNext()}
      </Container>
    );
  }
}

export default Pagination;
