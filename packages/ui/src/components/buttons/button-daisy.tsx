

export interface ButtonsDaisyProps {
  label: string;
  size: "btn-lg" | "btn-sm" | "btn-xs";
  onClick: () => void
  brandColor: 'btn-neutral' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-ghost' | 'btn-link'
  active?: 'btn-active'
  stateColor: 'btn-success' | 'btn-warning' | 'btn-error' | 'btn-info' | 'none'
  type: 'button' | 'submit' | 'reset'
  disabled: boolean
  loader: boolean
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
}

export const ButtonDaisy = ({ size, label, brandColor, stateColor, active, type, loader, iconLeft, iconRight, ...props }: ButtonsDaisyProps) => {
  return (
    <button
      className={`btn ${size} ${brandColor} ${stateColor} ${active}`}
      type={type}
      {...props}
    >
      {loader ? <span className="loading loading-spinner"></span> : <>{iconLeft} {label} {iconRight}</>}
    </button>
  );
};
