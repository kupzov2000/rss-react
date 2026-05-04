import type { Character } from '@/entities/character';
import { ResultList } from '@/entities/character/ui';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { Component } from 'react';

interface Props {
  loading: boolean;
  error: string | null;
  items: Character[];
}

export default class SearchContent extends Component<Props> {
  render() {
    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    if (this.props.error) {
      return <p className="error-container">{this.props.error}</p>;
    }

    return <ResultList viewModelCards={this.props.items} />;
  }
}
