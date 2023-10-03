import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { deleteContainer, getContainerContent } from "./containerSlice";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import React, { useState, useEffect } from "react";
import fastapi from "../../lib/api";
import { current } from "@reduxjs/toolkit";

const TopSideButtons = () => {
  const dispatch = useDispatch();
  const openAddNewContainerModal = () => {
    dispatch(
      openModal({
        title: "Add New Container",
        bodyType: MODAL_BODY_TYPES.CONTAINER_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewContainerModal()}
      >
        Add New Container
      </button>
    </div>
  );
};

function Containers() {
  //const [containerList, setContainerList] = useState();
  const { containers } = useSelector((state) => state.container);
  const dispatch = useDispatch();
  console.log(containers);
  useEffect(() => {
    dispatch(getContainerContent());
  }, []);

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">In Progress</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Sold</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Need Followup</div>;
    else return <div className="badge badge-ghost">Open</div>;
  };

  const deleteCurrentContainer = (_id, index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CONTAINER_DELETE,
          _id,
          index,
        },
      })
    );
  };

  const showDetail = (container) => {
    dispatch(
      openModal({
        title: "Show " + container.name + " Container Analysis",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.ANALYSIS,
        extraObject: { container },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Container List"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-scroll w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th style={{ position: "relative" }}>이름</th>
                <th>냉장 여부</th>
                <th>온도</th>
                <th>기울기</th>
                <th>습도</th>
                <th>진동</th>
                <th>항만</th>
                <th>부두</th>
                <th>생성 날짜</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {containers &&
                containers.map((container, k) => {
                  return (
                    <tr key={k}>
                      <td onClick={() => showDetail(container)}>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{container.name}</div>
                          </div>
                        </div>
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.cold ? "O" : "X"}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.temperature.toFixed(2)}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.humidity.toFixed(2)}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.slope.toFixed(2)}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.vibration.toFixed(2)}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.port}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {container.wharf}
                      </td>
                      <td onClick={() => showDetail(container)}>
                        {moment(new Date(container.create_date)).format(
                          "MMMM Do YYYY"
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() =>
                            deleteCurrentContainer(container.id, k)
                          }
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Containers;
