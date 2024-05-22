import React from "react";

const Button = ({ title, ...rest }) => {
  return (
    <button
      {...rest}
      className="block my-5 px-14 py-[6px] bg-[#d71e28] font-[600] rounded-full text-center text-[#ffffff] text-lg w-fit mx-auto"
    >
      {title}
    </button>
  );
};

export default Button;
