import React from 'react';

export interface Props {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  type = 'button',
  className = '',
  onClick,
  children,
}) => {
  /// color based on value of type, red if reset, green if submit, blue if button
  const color =
    type === 'reset'
      ? 'bg-red-600'
      : type === 'submit'
      ? 'bg-indigo-600'
      : 'bg-blue-600';

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${color} text-base font-medium text-white hover:bg-${color}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
