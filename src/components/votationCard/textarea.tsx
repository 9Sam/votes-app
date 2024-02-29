import { forwardRef, useEffect } from "react";

type TextAreaProps = {
   value: string;
   setValue: (state: string) => void;
   className?: string;
   getState: any;
   onBlur?: () => void;
   readOnly: boolean;
};

// Forwarding the ref to the underlying textarea element
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
   (props, ref: any) => {
      const { value, className, getState, readOnly, setValue, onBlur } = props;

      useEffect(() => {
         if (ref.current && value === "") {
            ref.current.focus();
         }
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
         setValue(e.target.value);
         getState(e.target.value);
      };

      const handleOnBlur = () => {
         if (onBlur) onBlur();
      };

      useEffect(() => {
         if (ref && ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
         }
      }, [value, ref]);

      const handleClick = () => {
         if (ref && ref.current) {
            ref.current.focus();
         }
      };

      return (
         <textarea
            ref={ref}
            className={`${className} input focus:outline-none p-2 border border-transparent ${
               !readOnly &&
               "rounded-lg hover:bg-gray-50 border border-white focus:bg-gray-50 focus:border-gray-300"
            } scrollbar-hide resize-none overflow-hidden `}
            rows={1}
            aria-label="textarea"
            placeholder="Write your text here"
            onChange={handleChange}
            onBlur={handleOnBlur}
            onClick={handleClick}
            value={value}
            readOnly={readOnly}
         ></textarea>
      );
   }
);

export default TextArea;
