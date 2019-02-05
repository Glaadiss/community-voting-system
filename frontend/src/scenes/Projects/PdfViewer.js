/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Document } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './PdvViewer.css';
import { withStyles } from '@material-ui/core/styles';

import { Page } from 'react-pdf';
import { Button } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    const { pageNumber } = this.state;
    return (
      pageNumber > 1 &&
      this.setState(state => ({ pageNumber: state.pageNumber - 1 }))
    );
  };

  goToNextPage = () => {
    const { numPages, pageNumber } = this.state;
    return (
      numPages > pageNumber &&
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }))
    );
  };

  render() {
    const { pageNumber, numPages } = this.state;
    // eslint-disable-next-line react/prop-types
    const { url, classes } = this.props;

    return (
      <div>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.goToPrevPage}
          >
            Poprzedni
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={this.goToNextPage}
          >
            Następny
          </Button>
        </div>
        <Document file={url} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width="900" />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

export default withStyles(styles)(PdfViewer);
