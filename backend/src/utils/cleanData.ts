import { omit } from "lodash";
import { Document } from "mongoose";

interface DataObject {
  _id?: any;
  id?: any;
  isDeleted?: boolean;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  [key: string]: any;
}

interface CleanDataParams {
  data: DataObject | DataObject[] | null;
  extraFieldsToOmit?: string[];
}

const cleanData = ({ data, extraFieldsToOmit = [] }: CleanDataParams): any => {
  const fieldsToOmit = [
    "isDeleted",
    "__v",
    "_id",
    "password",
    "createdAt",
    "updatedAt",
    "deletedAt",
    ...extraFieldsToOmit
  ];

  const cleanObject = (obj: DataObject | Document | null): any => {
    if (!obj) {
      return null;
    }

    let plainData: DataObject;

    if (obj instanceof Document) {
      plainData = obj.toObject();
    } else if (typeof obj.get === "function") {
      plainData = obj.get({ plain: true });
    } else {
      plainData = { ...obj };
    }

    return {
      id: obj._id ? obj._id.toString() : obj.id,
      ...omit(plainData, fieldsToOmit)
    };
  };

  return Array.isArray(data)
    ? data.map((item) => cleanObject(item))
    : cleanObject(data);
};

export default cleanData;
