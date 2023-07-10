import React from 'react';

const PostCategorySelector = ({ value, onChange, name, showAll }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-control "
    >
      {showAll ? <option>All</option> : null}
      <option>Python</option>
      <option>Javascript</option>
      <option>Java</option>
      <option>C sharp</option>
      <option>C</option>
      <option>C ++</option>
      <option>PHP</option>
      <option>Data Base</option>
      <option>Linux</option>
      <option>Other</option>
    </select>
  );
};

export default PostCategorySelector;
