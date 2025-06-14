import { registerNewRecord } from "./dashboard";
import { handleEdit } from "./crud";

export function handleSubmit() {
  const datePickerValue = document.getElementById("datepicker-autohide").value;
  const weightValue = document.getElementById("weight-input").value.trim();
  const commentsValue = document.getElementById("comments-input").value.trim();

  registerNewRecord(datePickerValue, weightValue, commentsValue);
}

export function validateWeightRecord() {
  console.log("validateWeightRecord FIRED");
  const datePicker = document.getElementById("datepicker-autohide");
  const weight = document.getElementById("weight-input");
  const datePickerValue = datePicker.value;
  const weightValue = weight.value.trim();
  const weightRecordSubmitBtn = document.getElementById("weight-submit-button");

  weightRecordSubmitBtn.removeEventListener("click", handleSubmit);
  if (datePickerValue && weightValue) {
    weightRecordSubmitBtn.addEventListener("click", handleSubmit);
    setSubmitButtonState("active");
    setDrawerFieldsState("valid");

  } else {
    setSubmitButtonState();
    setDrawerFieldsState();
    return;
  }
}

export function validateEditRecord(){
  console.log("validateEDIT FIRED");
  const datePickerEdit = document.getElementById("datepicker-autohide-edit");
  const weightEdit = document.getElementById("weight-input-edit");
  const datePickerEditValue = datePickerEdit.value;
  const weightEditValue = weightEdit.value.trim();
  const weightEditBtn = document.getElementById("weight-edit-button");

    weightEditBtn.removeEventListener("click", handleEdit);
  if (datePickerEditValue && weightEditValue) {
    weightEditBtn.addEventListener("click", handleEdit);
    setSubmitButtonState("active");
    setDrawerFieldsState("valid");

  } else {
    setSubmitButtonState();
    setDrawerFieldsState();
    return;
  }
  }

export function setSubmitButtonState(active) {
  const weightRecordSubmitBtn = document.getElementById("weight-submit-button");
  const weightEditBtn = document.getElementById("weight-edit-button");

  const activeButtonClasses = [
    "text-white",
    "bg-blue-700",
    "hover:bg-blue-800",
  ];
  const disabledButtonClasses = [
    "bg-gray-100",
    "border",
    "border-gray-300",
    "text-gray-400",
    "cursor-not-allowed",
  ];

  if (active) {
    weightRecordSubmitBtn.classList.remove(...disabledButtonClasses);
    weightRecordSubmitBtn.classList.add(...activeButtonClasses);
    weightRecordSubmitBtn.disabled = false;

    weightEditBtn.classList.remove(...disabledButtonClasses);
    weightEditBtn.classList.add(...activeButtonClasses);
    weightEditBtn.disabled = false;
  } else {
    weightRecordSubmitBtn.classList.remove(...activeButtonClasses);
    weightRecordSubmitBtn.classList.add(...disabledButtonClasses);
    weightRecordSubmitBtn.disabled = true;

    weightEditBtn.classList.remove(...activeButtonClasses);
    weightEditBtn.classList.add(...disabledButtonClasses);
    weightEditBtn.disabled = true;
  }
}

export function setDrawerFieldsState(valid) {
  const datePicker = document.getElementById("datepicker-autohide");
  const weight = document.getElementById("weight-input");
  const datePickerEdit = document.getElementById("datepicker-autohide-edit");
  const weightEdit = document.getElementById("weight-input-edit");

  const validClasses = [
    "bg-gray-50",
    "border-gray-300",
    "text-gray-900",
    "focus:ring-blue-500",
    "focus:border-blue-500",
    "dark:border-gray-600",
    "dark:placeholder-gray-400",
    "dark:text-white",
    "dark:focus:ring-blue-500",
    "dark:focus:border-blue-500",
  ];

  const errorClasses = [
    "bg-red-50",
    "border-red-500",
    "text-red-900",
    "placeholder-red-700",
    "focus:ring-red-500",
    "focus:border-red-500",
    "dark:text-red-500",
    "dark:placeholder-red-500",
    "dark:border-red-500",
  ];

  if (datePicker.value.trim() !== "" || datePickerEdit.value.trim() !== "") {
    datePicker.classList.remove(...errorClasses);
    datePicker.classList.add(...validClasses);
    datePickerEdit.classList.remove(...errorClasses);
    datePickerEdit.classList.add(...validClasses);
  } else {
    datePicker.classList.remove(...validClasses);
    datePicker.classList.add(...errorClasses);
    datePickerEdit.classList.remove(...validClasses);
    datePickerEdit.classList.add(...errorClasses);
  }

  if (weight.value.trim() !== "" || weightEdit.value.trim() !== "") {
    weight.classList.remove(...errorClasses);
    weight.classList.add(...validClasses);
    weightEdit.classList.remove(...errorClasses);
    weightEdit.classList.add(...validClasses);
  } else {
    weight.classList.remove(...validClasses);
    weight.classList.add(...errorClasses);
    weightEdit.classList.remove(...validClasses);
    weightEdit.classList.add(...errorClasses);
  }
}