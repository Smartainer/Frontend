import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewContainer } from "../containerSlice";
import fastapi from "../../../lib/api";

const INITIAL_CONTAINER_OBJ = {
  // id: 0,
  name: "",
  cold: "",
  temperature: Math.random() * 30,
  humidity: Math.random() * 30,
  slope: Math.random() * 30,
  vibration: Math.random() * 30,
  port: "",
  wharf: "",
};

function AddContainerModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [containerObj, setContainerObj] = useState(INITIAL_CONTAINER_OBJ);

  const saveNewContainer = () => {
    if (containerObj.name.trim() === "")
      return setErrorMessage("이름을 입력해주세요.");
    else if (containerObj.cold.trim() === "")
      return setErrorMessage("냉장 여부를 입력해주세요.");
    else if (containerObj.port.trim() === "")
      return setErrorMessage("항만을 입력해주세요.");
    else if (containerObj.wharf.trim() === "")
      return setErrorMessage("부두를 입력해주세요.");
    else {
      if (containerObj.cold == "냉장") containerObj.cold = true;
      else containerObj.cold = false;
      let newContainerObj = {
        name: containerObj.name,
        cold: containerObj.cold,
        temperature: parseFloat(containerObj.temperature),
        slope: parseFloat(containerObj.slope),
        humidity: parseFloat(containerObj.humidity),
        vibration: parseFloat(containerObj.vibration),
        port: containerObj.port,
        wharf: containerObj.wharf,
      };
      dispatch(addNewContainer({ newContainerObj }));
      dispatch(
        showNotification({ message: "New Container Added!", status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setContainerObj({ ...containerObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={containerObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="컨테이너 이름"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={containerObj.cold}
        updateType="cold"
        containerStyle="mt-4"
        labelTitle="냉장 여부 (냉장/실온)"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={containerObj.port}
        updateType="port"
        containerStyle="mt-4"
        labelTitle="항만"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={containerObj.wharf}
        updateType="wharf"
        containerStyle="mt-4"
        labelTitle="부두"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewContainer()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddContainerModalBody;
