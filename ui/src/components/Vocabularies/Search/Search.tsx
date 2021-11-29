import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { VocabulariesContext } from "../../../contexts/vocabulariesContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import ErrorModal from "../../Common/ErrorModal/ErrorModal";

interface IProps {
  setSkeletonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInfinite: React.Dispatch<React.SetStateAction<boolean>>;
  getOriginalVocabularies: () => void;
}

const Search: React.FC<IProps> = ({
  setSkeletonLoading,
  setIsInfinite,
  getOriginalVocabularies,
}) => {
  const {
    user: { _id, token },
  } = useAuthContext();
  const [error, setError] = useState<null | string>(null);
  const { setVocabularies } = useContext(VocabulariesContext);
  const [searchVal, setSearchVal] = useState("");
  const [timer, setTimer] = useState<null | number>(null);

  const changeSearchValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchVal(value);
  };

  useEffect(() => {
    setSkeletonLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    const result: any = setTimeout(async () => {
      if (searchVal === "") {
        timer && getOriginalVocabularies();
        return;
      }
      try {
        setIsInfinite(false);
        const resp = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/vocabulary/search/${searchVal}/${_id}`,
          method: "GET",
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        setSkeletonLoading(false);
        setVocabularies(resp.data);
      } catch (err: any) {
        setError(err?.response?.data);
        setSkeletonLoading(false);
      }
    }, 2000);
    setTimer(result);
  }, [searchVal]);

  return (
    <div className="mt-4 sm:mt-0 w-3/5  mx-auto">
      {error && <ErrorModal error={error} setError={setError} />}
      <form className="relative">
        <div className="relative flex items-center">
          <input
            value={searchVal}
            onChange={changeSearchValHandler}
            className="border-2 w-full p-2 rounded-full"
            type="text"
            placeholder="Search Vocabularies"
          />
          {searchVal && (
            <i
              onClick={() => setSearchVal("")}
              className="-ml-8 fas fa-times cursor-pointer text-xl"
            ></i>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
