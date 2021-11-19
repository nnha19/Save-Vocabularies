import React, { createContext, useState } from "react";

interface IFilterType {
  showFilterDropdown: boolean;
  setShowFilterDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterDropdownContext = createContext<IFilterType>(
  {} as IFilterType
);

const FilterDropdownContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <FilterDropdownContext.Provider
      value={{ showFilterDropdown, setShowFilterDropdown }}
    >
      {children}
    </FilterDropdownContext.Provider>
  );
};

export default FilterDropdownContextProvider;
