import { useState } from "react";

function useModal(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return [isOpen, open, close];
};

export default useModal;