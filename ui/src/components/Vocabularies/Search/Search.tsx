import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { VocabulariesContext } from "../../../contexts/vocabulariesContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";

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
  const { setVocabularies } = useContext(VocabulariesContext);
  const [searchVal, setSearchVal] = useState("");
  const [timer, setTimer] = useState<null | number>(null);

  useEffect(() => {
    if (searchVal.length < 1) {
      setTimeout(() => {}, 1000);
    }
  }, [searchVal]);

  const changeSearchValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSkeletonLoading(true);
    setSearchVal(value);
    if (timer) {
      clearTimeout(timer);
    }
    const result: any = setTimeout(async () => {
      if (value === "") {
        getOriginalVocabularies();
        return;
      }
      try {
        setIsInfinite(false);
        const resp = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/vocabulary/search/${value}/${_id}`,
          method: "GET",
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        setSkeletonLoading(false);
        setVocabularies(resp.data);
      } catch (err) {
        console.log(err);
        setSkeletonLoading(false);
      }
    }, 2000);
    setTimer(result);
  };

  return (
    <div className="mt-4 sm:mt-0 w-3/5  mx-auto">
      <form className="relative">
        <input
          onChange={changeSearchValHandler}
          className="border-2 w-full p-2 rounded-full"
          type="text"
          placeholder="Search Vocabularies"
        />
      </form>
    </div>
  );
};

export default Search;
