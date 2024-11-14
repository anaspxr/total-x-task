type InputBoxProps = {
  label: string;
  touched: boolean | undefined;
  error: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputBox(props: InputBoxProps) {
  const { label, touched, error, ...inputAttributes } = props;
  return (
    <div className="relative">
      <label
        htmlFor={inputAttributes.id}
        className={`text-xs absolute -top-2 bg-white px-1 left-2 rounded-sm ${
          touched && error ? "text-red-400" : ""
        }`}>
        {label}
      </label>
      <input
        className={`border  rounded-sm w-full h-10 px-2 ${
          error && touched ? "border-red-500" : "border-zinc-400"
        }`}
        {...inputAttributes}
      />
      {touched && error ? (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      ) : null}
    </div>
  );
}
