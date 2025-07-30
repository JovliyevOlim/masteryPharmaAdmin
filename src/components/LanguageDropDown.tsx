import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropDown = () => {
  const { t, i18n }: any = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const [flag, setFlag] = useState('flag-icon-ru');

  const handleChangeLanguage = (lng: any) => {
    i18n.changeLanguage(lng.value);
    setDropdownOpen(false);
    setFlag(lng.flags);
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const languages = [
    { name: 'Русский', value: 'ru', flags: 'flag-icon-ru' },
    { name: "O'zbek", value: 'uz', flags: 'flag-icon-uz' },
  ];

  return (
    <div className="relative flex">
      <button
        className="text-[#98A6AD] hover:text-body"
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <i className={`flag-icon ${flag} m-0`}></i>
      </button>
      <div
        ref={dropdown}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        {languages.map((l: any) => (
          <button
            key={l?.name}
            onClick={() => handleChangeLanguage(l)}
            className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          >
            <i className={`flag-icon ${l.flags} m-0`}></i>
            {l?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropDown;
