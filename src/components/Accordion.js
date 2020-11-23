import React, { useState } from 'react';

const Accordion = ({ items }) => {
    // initialize piece of state
  const [activeIndex, setActiveIndex] = useState(null);

    // initialize piece of state

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

    // pulls content from static items array and displays in div using Semantic UI
  const renderedItems = items.map((item, index) => {
    // determines whether a renderedItem is active or not
    const active = index === activeIndex ? 'active' : '';

    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
