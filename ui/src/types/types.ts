export interface IVocabulary {
  vocabulary: string;
  id: string;
  defination: string;
  exampleSentences?: string[];
  note?: string;
  timeStamp: string;
}

export interface IVocabularies {
  vocabularies: IVocabulary[];
}
