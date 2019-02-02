import React, { Component } from 'react';
import { Document } from 'react-pdf/dist/entry.webpack';

import { Page } from 'react-pdf';

class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    // eslint-disable-next-line react/prop-types
    const { url } = this.props;
    return (
      <div>
        <Document file={{ url }} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page
          {pageNumber}
          of
          {numPages}
        </p>
      </div>
    );
  }
}

export default PdfViewer;
