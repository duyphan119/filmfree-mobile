import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";

export const useModal = () => useContext(ModalContext);
