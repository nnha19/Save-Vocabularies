import React, { useEffect, useState } from "react";

interface IProps {
  setSkeletonLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<IProps> = ({ setSkeletonLoading }) => {
  const [searchVal, setSearchVal] = useState("");
  const [timer, setTimer] = useState<null | number>(null);

  useEffect(() => {
    if (searchVal.length < 1) {
      setTimeout(() => {}, 1000);
    }
  }, [searchVal]);

  const changeSearchValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    const result: any = setTimeout(async () => {
      try {
      } catch (err) {}
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
