import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FilterDropdownContext } from "../../../contexts/filterDropdownContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IVocabularies, IVocabulary } from "../../../types/types";
import Spinner from "../../Common/Spinner/Spinner";

interface IProps {
  setIsInfinite: React.Dispatch<React.SetStateAction<boolean>>;
  setOriginalVocabularies: React.Dispatch<React.SetStateAction<IVocabulary[]>>;
  setSkeletonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getVocabularies: () => Promise<void>;
}

const FilterByResource: React.FC<IProps> = ({
  setOriginalVocabularies,
  setIsInfinite,
  setSkeletonLoading,
  getVocabularies,
}) => {
  const [fetchResourceIsLoading, setFetchIsLoading] = useState(false);
  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);
  const { _id, token } = useAuthContext();

  useEffect(() => {
    (async () => {
      setFetchIsLoading(true);
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/vocabulary/all/${_id}`,
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setVocabularies(resp.data);
      setFetchIsLoading(false);
    })();
  }, []);

  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const { showFilterDropdown, setShowFilterDropdown } = useContext(
    FilterDropdownContext
  );
  let resources = vocabularies
    .filter((voca) => voca.resource)
    .map((v) => v.resource);

  resources = Array.from(new Set(resources));

  const selectResourceHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    resource: string
  ) => {
    if (e.target.checked) {
      setSelectedResources([...selectedResources, resource]);
    } else {
      let updatedSelectedResources = [...selectedResources];
      updatedSelectedResources = updatedSelectedResources.filter(
        (r) => r !== resource
      );
      setSelectedResources(updatedSelectedResources);
    }
  };

  const resourcesList = resources.map((resource, i) => {
    let checkboxChecked =
      resource && selectedResources.includes(resource) ? true : false;
    return (
      resource && (
        <div className="my-2 px-4 py-2 text-lg flex items-center" key={i}>
          <input
            checked={checkboxChecked}
            onChange={(e) => selectResourceHandler(e, resource)}
            className="mr-2 cursor-pointer"
            id={resource}
            type="checkbox"
          />
          <label className="cursor-pointer" htmlFor={resource}>
            {resource}
          </label>
        </div>
      )
    );
  });

  const filterByResourcesHandler = async () => {
    setSkeletonLoading(true);
    const resources = selectedResources.join("&");
    const resp = await axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/vocabulary/filter/${resources}`,
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    setOriginalVocabularies(resp.data);
    setIsInfinite(false);
    setShowFilterDropdown(false);
    setSkeletonLoading(false);
  };

  const clearFilterHandler = () => {
    setOriginalVocabularies([]);
    setIsInfinite(true);
    setSelectedResources([]);
    getVocabularies();
  };

  return (
    <div id="filter-by-resource" className="relative ">
      <div
        onClick={() => setShowFilterDropdown(true)}
        className="flex items-center cursor-pointer rounded bg-primaryColor text-white p-2"
      >
        <i className="fas fa-filter mr-4"></i>
        <span>Filter By Resources</span>
      </div>
      {showFilterDropdown && (
        <div className=" absolute min-h-52 top-10 left-0 rounded w-full py-4 bg-white mt-2 shadow-xl">
          {fetchResourceIsLoading ? (
            <Spinner style={{ height: "8rem" }} />
          ) : (
            resourcesList
          )}
          <div className="px-4">
            <button
              onClick={filterByResourcesHandler}
              className="px-8 py-2 bg-primaryColor text-white rounded"
            >
              Save
            </button>
            <button
              onClick={clearFilterHandler}
              className="mt-4 px-8 py-2 bg-primaryColor text-white rounded"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterByResource;
