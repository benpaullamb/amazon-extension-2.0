import { useState } from 'react';
import style from './Dropdown.module.scss';

export default function Dropdown({ value, onChange, options }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (option) => {
    onChange(option);
    setShowOptions(false);
  };

  return (
    <div className={style.container}>
      <span className={style.label}>Sort by:</span>

      <div className={style.dropdown}>
        <div onClick={() => setShowOptions(!showOptions)} className={style.selected}>
          <span>{value}</span>
        </div>

        {showOptions && (
          <div className={style.options}>
            {options.map((option) => (
              <span onClick={() => handleChange(option)} className={style.option}>
                {option}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
