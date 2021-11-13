import React from "react";

const useRenderExampleSentences = (
  sentences: string[] | undefined,
  vocabulary: string,
  removeSentence?: (sentence: string) => void,
  className?: string
) => {
  if (!sentences) {
    return;
  }
  return sentences.map((sentence, i) => {
    return (
      <p className={`mb-2 flex flex-wrap ${className}`}>
        <div>
          {sentence.split(" ").map((w) => {
            return (
              <span
                className={`mr-2 ${
                  vocabulary.toLocaleLowerCase() === w.toLocaleLowerCase() &&
                  "font-bold"
                }`}
              >
                {w}
              </span>
            );
          })}
        </div>
        {removeSentence && (
          <i
            onClick={() => removeSentence(sentence)}
            className="far fa-trash-alt text-xl cursor-pointer"
          ></i>
        )}
      </p>
    );
  });
};

export default useRenderExampleSentences;
