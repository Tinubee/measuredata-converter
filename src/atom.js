import { atom } from "recoil";

export const partNumberAtom = atom({
  key: "partNumber",
  default: "",
});

export const checkDataAtom = atom({
  key: "checkdata",
  default: false,
});

export const processNumberAtom = atom({
  key: "processNumber",
  default: "A05/프레스",
});

export const factoryCodeAtom = atom({
  key: "factoryCode",
  default: "1",
});

export const moldNumberAtom = atom({
  key: "moldNumber",
  default: "1",
});
export const cavityAtom = atom({
  key: "cavity",
  default: "",
});
export const lotNumberAtom = atom({
  key: "lotNumber",
  default: "",
});
export const productionDateAtom = atom({
  key: "productionDate",
  default: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
});

export const productTypeAtom = atom({
  key: "productType",
  default: "",
});

export const inspectorNameAtom = atom({
  key: "inspectorName",
  default: "Keyence",
});

export const noteAtom = atom({
  key: "note",
  default: "",
});

export const specialtyAtom = atom({
  key: "specialty",
  default: "",
});
