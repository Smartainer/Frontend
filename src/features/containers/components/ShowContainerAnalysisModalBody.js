import { useState } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "../../dashboard";

const INITIAL_CONTAINER_OBJ = {
  //id: "",
  name: "",
  cold: "",
  temperature: 0.0,
  humidity: 0.0,
  slope: 0.0,
  vibration: 0.0,
  port: "",
  wharf: "",
};

function ShowContainerAnalysisModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [containerObj, setContainerObj] = useState(INITIAL_CONTAINER_OBJ);

  const updateFormValue = ({ updateType, value }) => {
    setContainerObj({ ...containerObj, [updateType]: value });
  };

  return (
    <>
      <Dashboard container_id={extraObject.id} />
    </>
  );
}

export default ShowContainerAnalysisModalBody;
