import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.card.fontSize};
  margin: ${({ theme }) => theme.card.margin};
  padding: ${({ theme }) => theme.card.padding};
  background: ${({ theme }) => theme.card.bg};
  color: ${({ theme, active }) => active ? theme.card.activeFG : theme.card.fg};
  border-bottom: ${({ theme }) => theme.card.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Help = styled.span`
  font-family: ${({ theme }) => theme.card.helpFontFamily};
  font-style: italic;
  font-size: ${({ theme }) => theme.card.helpFontSize};
  font-weight: ${({ theme }) => theme.card.helpFontWeight};
`;

export default class Card extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    helpText: React.PropTypes.string,
  };

  static defaultProps = {
    helpText: null,
  };

  render() {
    const { children, helpText } = this.props;
    return (
      <Container>
        {children}
        <Help>{helpText}</Help>
      </Container>
    );
  }
}