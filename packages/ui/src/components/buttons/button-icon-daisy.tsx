
export interface ButtonIconDaisyProps {
  square: 'btn-square' | 'btn-square btn-outline'
  children: React.ReactNode;
  className: string;
}
export const ButtonIconDaisy = ({square, children, className}: ButtonIconDaisyProps) => {
  return (
    <button className={`btn ${square} ${className}`}>
      {children}
    </button>
  )
}