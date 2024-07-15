import { createContext, useState } from "react";

type ModalName = "streaming" | "search";

type ModalContextValues = {
  visible: boolean;
  onShow: (name: ModalName, data?: Record<string, any>) => void;
  onHide: () => void;
  data: Record<string, any>;
  name: ModalName;
};

export const ModalContext = createContext<ModalContextValues>({
  data: {},
  onShow: (name: ModalName, data?: Record<string, any>) => {},
  visible: false,
  onHide: () => {},
  name: "search",
});

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [modalName, setModalName] = useState<ModalName>("search");

  const [data, setData] = useState<Record<string, any>>({});

  const onShow = (name: ModalName, newData?: Record<string, any>) => {
    setVisible(true);

    setModalName(name);

    if (newData) {
      setData((prevState) => ({ ...prevState, ...newData }));
    }
  };

  const onHide = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{
        visible,
        onShow,
        data,
        onHide,
        name: modalName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
