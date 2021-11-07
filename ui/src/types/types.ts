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

export interface IUser {
  username: string;
  email: string;
  joinedDate: string;
  vocabularies: string[];
  _id: string;
}
export interface IUsers {
  users: IUser[];
}
