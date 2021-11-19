import React, { useContext } from "react";
import { FilterDropdownContext } from "../../../contexts/filterDropdownContext";
import { IVocabularies } from "../../../types/types";

interface IProps {
  vocabularies: IVocabularies["vocabularies"];
}

const FilterByResource: React.FC<IProps> = ({ vocabularies }) => {
  const { showFilterDropdown, setShowFilterDropdown } = useContext(
    FilterDropdownContext
  );
  let resources = vocabularies
    .filter((voca) => voca.resource)
    .map((v) => v.resource);

  resources = Array.from(new Set(resources));

  const resourcesList = resources.map((resource, i) => {
    return (
      <div className="my-2" key={i}>
        <input className="mr-2" id={resource} type="checkbox" />
        <label htmlFor={resource}>{resource}</label>
      </div>
    );
  });

  return (
    <div id="filter-by-resource" className="relative ">
      <div
        onClick={() => setShowFilterDropdown(true)}
        className="flex items-center cursor-pointer rounded bg-red-500 text-white p-2"
      >
        <i className="fas fa-filter mr-4"></i>
        <span>Filter By Resources</span>
      </div>
      {showFilterDropdown && (
        <div className="absolute top-10 left-0 rounded w-full p-4 bg-red-500 mt-2 text-white">
          {resourcesList}
        </div>
      )}
    </div>
  );
};

export default FilterByResource;
