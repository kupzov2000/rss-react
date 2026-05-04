import { Component } from 'react';
import './ErrorViewButton.css';

interface Props {
  onClick: () => void;
}

export class ErrorViewButton extends Component<Props> {
  render() {
    return (
      <button className="error__button" onClick={this.props.onClick}>
        Error
      </button>
    );
  }
}
