import React from "react";

const Input = ({ title, children, ...rest }) => {
  return (
    <div className="w-full relative cursor-pointer mb-6">
      {/* <label className="text-[14px] mb-1 block">{title}</label> */}
      <input
        type="text"
        className={`p-[11px] text-[#333333] bg-[#ffffff] w-full border-b-[1px] border-[#a8a8a8] focus:bg-[#eff3f8] focus:border-[#d71e28]`}
        placeholder={title}
        required
        {...rest}
      />
      {children ? children : null}
    </div>
  );
};

export default Input;
