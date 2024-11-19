export default interface ErrorStoreInterface {
  isError: boolean;
  setIsError: (isError: boolean) => void;
  message?: string;
  setMessage: (message: string) => void;
}
