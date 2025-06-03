interface Props {
    children?: React.ReactNode;
    onClick: () => void;
    className: string
  }
export const Button: React.FC<Props> = ({ 
    children,
    onClick,
    className 
  }) => { 
  return (
    <button 
    className={className}
      onClick={onClick}
    >
    {children}
    </button>
  );
}
