import React from "react";

const FormLayout = ({ children, handleSubmit, title, subTitle }) => {
  return (
    <div className="w-full grid place-items-center max-w-[870px] mx-auto md:rounded-xl bg-white py-6 mt-[30px] md:mt-[130px] md:mb-[55px] md:shadow-[0_0_16px_0_rgba(59,51,49,.15)]">
      <form
        className="form w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl mb-2 text-center">{title}</h1>
        {subTitle && <p className="mb-4 text-[15px] text-center">{subTitle}</p>}
        <div>{children}</div>
      </form>
    </div>
  );
};

export default FormLayout;
