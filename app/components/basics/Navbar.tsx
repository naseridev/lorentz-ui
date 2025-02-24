import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface MenuItem {
  label: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

interface NavbarProps {
  menuItems: MenuItem[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
      buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-60 backdrop-blur-lg p-4 text-white shadow-xl z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="md:text-3xl text-2xl font-extrabold">Lorentz</div>

        <div className="relative flex-grow max-w-xs ml-4 lg:max-w-sm xl:max-w-md">
          <input
            name="Search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-40 backdrop-blur-md text-white placeholder-gray-300 outline-none transition-all duration-200 ease-in-out"
            aria-label="Search"
          />
        </div>

        <button
          ref={buttonRef}
          className="text-2xl px-4 py-2 transition-colors duration-300 ease-in-out rounded-md relative z-50"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div
          ref={menuRef}
          id="menu"
          className={`fixed top-full right-0 mt-6 mr-6 bg-black rounded-md shadow-xl w-48 z-40 transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          role="menu"
        >
          <ul className="text-white">
            {menuItems.map((item, index) => (
              <li key={index} className="group">
                <Link
                  href={item.href}
                  onClick={item.onClick}
                  className={`block px-4 py-3 ${item.className} ${index === 0 ? 'rounded-tl-md rounded-tr-md' : ''
                    } ${index === menuItems.length - 1
                      ? 'rounded-bl-md rounded-br-md'
                      : ''
                    } bg-black transition-all duration-300 ease-in-out group-hover:text-black group-hover:bg-opacity-75`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
