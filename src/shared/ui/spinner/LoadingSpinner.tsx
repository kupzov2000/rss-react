import { Component } from 'react';
import './LoadingSpinner.css';

export default class LoadingSpinner extends Component {
  render() {
    return <div className="spinner" role="status" aria-label="loading" />;
  }
}
