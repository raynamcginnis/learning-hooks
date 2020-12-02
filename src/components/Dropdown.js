import React, { useState, useEffect, useRef } from 'react';

// function that assigns key, and provides the labels of the options array from App.js
const Dropdown = ({ options, selected, onSelectedChange, label }) => {
    const [ open, setOpen] = useState(false);
    const ref = useRef();

// function that listens for any clicks on the page
useEffect(() => {
    const onBodyClick = (event) => {
        if (ref.current && ref.current.contains(event.target)) {
          return;
        }
  
        setOpen(false);
      };

    document.body.addEventListener('click', onBodyClick);

    // if dropdown is removed, clean up by removing event listener
    return () => { 
document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

    const renderedOptions = options.map((option) => {
        // hides the currently selected item from the displayed options list
        if (option.value === selected.value) {
            return null;
        }

        return (
            <div
            key={option.value}
            className="item"
            // when you click on an option, it updates the selected state to newly selection option
            onClick={() => 
                onSelectedChange(option)}
            >
                {option.value}
            </div>
        );
    });


    // returns label, and rendered options in a drop down menu
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">
                    {label}
                </label>
                {/* When the drop down is clicked, setOpen is set to the opposite of whatever it is prior to being clicked*/}
                {/* update classname based on if open is set to true or false. If open, add visible active classnames, else return empty string */}
                <div onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.value}</div>
                    {/* update classname based on if open is set to true or false. If open, add visible transition classname, else return empty string */}
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}

                    </div>
                </div>
                <div>
                    <p>{selected.label}</p>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;