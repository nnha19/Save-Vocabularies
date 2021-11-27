import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FilterDropdownContext } from "../../../contexts/filterDropdownContext";
import { VocabulariesContext } from "../../../contexts/vocabulariesContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { IVocabularies, IVocabulary } from "../../../types/types";
import Spinner from "../../Common/Spinner/Spinner";

interface IProps {
  setIsInfinite: React.Dispatch<React.SetStateAction<boolean>>;
  setSkeletonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getOriginalVocabularies: () => void;
}

const FilterByResource: React.FC<IProps> = ({
  setIsInfinite,
  setSkeletonLoading,
  getOriginalVocabularies,
}) => {
  const { setVocabularies: setOriginalVocabularies } =
    useContext(VocabulariesContext);
  const [fetchResourceIsLoading, setFetchIsLoading] = useState(false);
  const [vocabularies, setVocabularies] = useState<
    IVocabularies["vocabularies"]
  >([] as IVocabularies["vocabularies"]);
  const {
    user: { _id, token },
  } = useAuthContext();

  useEffect(() => {
    if (selectedResources.length > 0) return;
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

  const resourceObj: any = {};
  resources.forEach((r, i) => {
    if (!r) return;
    if (resourceObj[r] > 0) {
      resourceObj[r] = resourceObj[r] + 1;
    } else {
      resourceObj[r] = 1;
    }
  });

  const resourcesList = Object.keys(resourceObj).map((k, i) => {
    let checkboxChecked = k && selectedResources.includes(k) ? true : false;
    return (
      k && (
        <div className="my-2 px-4 py-2 text-lg flex items-center" key={i}>
          <input
            checked={checkboxChecked}
            onChange={(e) => selectResourceHandler(e, k)}
            className="mr-2 cursor-pointer"
            id={k}
            type="checkbox"
          />
          <label className="cursor-pointer" htmlFor={k}>
            {k} ({resourceObj[k]})
          </label>
        </div>
      )
    );
  });

  const selectResourceHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    resource: string
  ) => {
    let updatedSelectedResources;
    if (e.target.checked) {
      updatedSelectedResources = [...selectedResources, resource];
    } else {
      updatedSelectedResources = [...selectedResources];
      updatedSelectedResources = updatedSelectedResources.filter(
        (r) => r !== resource
      );
    }
    localStorage.setItem(
      "selectedResources",
      JSON.stringify(updatedSelectedResources)
    );
    setSelectedResources(updatedSelectedResources);
  };

  const filterByResourcesHandler = async (rArg?: string[]) => {
    if (selectedResources.length === 0 && !rArg) {
      return;
    }
    setSkeletonLoading(true);
    const resources = rArg ? rArg : selectedResources;
    const resp = await axios({
      url: `${
        process.env.REACT_APP_BACKEND_URL
      }/vocabulary/filter/${resources.join("&")}`,
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

  const clearSelectedVocabularies = () => {
    if (selectedResources.length < 1) {
      return;
    }
    setSelectedResources([]);
    setShowFilterDropdown(false);
    getOriginalVocabularies();
    localStorage.removeItem("selectedResources");
  };

  useEffect(() => {
    //See if there is selected resources in LS
    let lItems: any = localStorage.getItem("selectedResources");
    if (lItems) {
      lItems = JSON.parse(lItems);
      if (lItems.length > 0) {
        setSelectedResources(lItems);
        filterByResourcesHandler(lItems);
      }
    }
  }, []);

  const btnsDisabled = selectedResources.length < 1;

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
        <div className="z-10 shadow-boxshadow absolute h-96 overflow-y-auto min-h-52 top-10 left-0 rounded w-80 pt-4 bg-white mt-2 flex flex-col justify-between">
          {fetchResourceIsLoading ? (
            <Spinner style={{ height: "8rem" }} />
          ) : (
            resourcesList
          )}
          <div className="px-4 sticky bottom-0 border-t-2 bg-white py-2 disabled-btn">
            <button
              disabled={btnsDisabled}
              onClick={() => filterByResourcesHandler()}
              className="px-8 py-2 bg-primaryColor text-white rounded disabled-btn"
            >
              Save
            </button>
            <button
              disabled={btnsDisabled}
              onClick={clearSelectedVocabularies}
              className="ml-4 mt-4 px-8 py-2 bg-primaryColor text-white rounded disabled-btn"
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
