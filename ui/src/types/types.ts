export interface IVocabulary {
  vocabulary: string;
  _id: string;
  defination: string;
  exampleSentences?: string[];
  note?: string;
  timeStamp: string;
  resource?: string;
}

export interface IVocabularies {
  vocabularies: IVocabulary[];
}
