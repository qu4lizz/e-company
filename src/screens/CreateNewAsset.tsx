import { useFormik } from "formik";
import * as yup from "yup";

export const CreateNewAsset = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    barcode: yup.string().required("Barcode is required"),
    price: yup.number().required("Price is required"),
    location_id: yup.number().required("Location is required"),
    employee_id: yup.number().required("Employee is required"),
    image: yup.array().required("Image is required"),
  });
};
