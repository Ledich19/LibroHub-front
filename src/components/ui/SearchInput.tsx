interface IProps {
  placeholder: string
  value: string 
  onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, onChange }: IProps) => {
  return (
    <label aria-label={`Search ${placeholder}`} className={`input input-sm border-dashed  border-base-content
                placeholder:text-muted-foreground 
                flex 
               outline-hidden 
                disabled:cursor-not-allowed disabled:opacity-50
                min-w-50`}>
      <svg className="h-[2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required placeholder={placeholder} />
    </label>
  );
}

export default SearchInput