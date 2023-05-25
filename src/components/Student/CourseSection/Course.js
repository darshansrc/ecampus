import React from "react";
import StudentTopNavbar from "../MobileNav/StudentTopNavbar";
import ScheduleTimeTable from "./ScheduleTimeTable/ScheduleTimeTable";
import CourseMaterial from "./CourseMaterial/CourseMaterial";

export default function Course() {
  return (
    <>
      <StudentTopNavbar text={"Course "} />

      <CourseMaterial />

      <ScheduleTimeTable />
    </>
  );
}
