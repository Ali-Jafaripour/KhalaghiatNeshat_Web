interface ButtonSecendryProps {
    text: string;
  }
  
  const ButtonSecendry = ({ text = 'Hover Over' }: ButtonSecendryProps) => {
    return (
      <div className="relative">
        <button className="
          text-primary-3 text-base font-peyda font-medium
          cursor-pointer border-none bg-transparent uppercase
          transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          hover:text-primary-1 focus:text-primary-1
          relative
          after:content-[''] after:absolute after:pointer-events-none
          after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px]
          after:bg-primary-1
          after:transition-[width,left] after:duration-900 after:ease-[cubic-bezier(0.25,0.8,0.25,1)]
          hover:after:w-full hover:after:left-0
          focus:after:w-full focus:after:left-0
        ">
          {text}
        </button>
      </div>
    );
  }
  
  export default ButtonSecendry;
  