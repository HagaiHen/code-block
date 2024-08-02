import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CodeBlockDropdown = ({ placeholder, codeBlocks, handleSelect }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">{placeholder}</Dropdown.Toggle>
      <Dropdown.Menu>
        {codeBlocks.map((codeBlock) => (
          <Dropdown.Item
            key={codeBlock._id}
            onClick={() => handleSelect(codeBlock)}
          >
            {codeBlock.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CodeBlockDropdown;