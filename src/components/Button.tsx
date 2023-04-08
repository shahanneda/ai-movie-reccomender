import React from 'react';

export interface Props {
  className?: string;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  label,
  type = 'button',
  className = '',
  onClick,
}) => {
  /// color based on value of type, red if reset, green if submit, blue if button
  const color =
    type === 'reset' ? 'red' : type === 'submit' ? 'indigo' : 'blue';

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2     bg-${color}-600 text-base font-medium text-white hover:bg-${color}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button };
