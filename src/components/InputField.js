import React from "react";

const InputField = ({ type, label, value, onChange, error }) => (
  <div>
    <label className="block font-[700] ">{label}:</label>
    <input type={type} value={value} onChange={onChange} className="bg-red-400 px-[10px] py-[10px] rounded-[12px] w-[500px]"/>
    {error && <p className="text-[red]">{error}</p>}
  </div>
);

export default InputField;
