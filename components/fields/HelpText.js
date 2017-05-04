import styled from 'styled-components';

const HelpText = styled.div.withConfig({ displayName: 'HelpText' })`
  color: ${({ theme }) => theme.input.helpTextFG};
  font-style: italic;
  font-weight: ${({ theme }) => theme.input.helpTextFontWeight};
  padding: ${({ theme }) => theme.input.helpTextPadding};
  font-family: ${({ theme }) => theme.input.helpTextFontFamily};
`;

HelpText.usage = `
# HelpText

HelpText goes below an input or interactive component to give the user some information about what
that component might do, or below some information to explain its meanin  g, context or importance.
`;

export default HelpText;