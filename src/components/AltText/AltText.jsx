import React from 'react';
import PropTypes from 'prop-types';
import './AltText.css';

function AltText({ title }) {
  return <p className="alt-text">{title}</p>;
}

AltText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AltText;
