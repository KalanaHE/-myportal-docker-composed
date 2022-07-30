import * as Yup from "yup";

export const tourguideRegistrationSchema = {
  fullName: Yup.string().required("Name is required").nullable(),
  nic: Yup.string().required("NIC is required").nullable(),
  email: Yup.string().required("Email is required").nullable(),
  phone: Yup.string().required("Phone Number is required").nullable(),
};
// vehicleType: Yup.object().required("Vehicle type is required").nullable(),
// model: Yup.string().required("Model is required").nullable(),
// plateNo: Yup.string().required("Vehicle Plate No is required").nullable(),
// fuelType: Yup.object().required("Fuel Type is required").nullable(),
// maxFuelUsage: Yup.string().required("Maximum Fuel Usage is required").nullable(),
// duration: Yup.object().required("Duration is required").nullable(),
