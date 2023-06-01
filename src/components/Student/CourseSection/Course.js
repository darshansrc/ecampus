import React from 'react'
import StudentTopNavbar from '../MobileNav/StudentTopNavbar'
import ScheduleTimeTable from './ScheduleTimeTable/ScheduleTimeTable'
import CourseMaterial from './CourseMaterial/CourseMaterial'

const Course = () => {
  return (
    <>
	<StudentTopNavbar text={'Course Section'}/>
    <div style={{marginTop: '75px'}}>
    <ScheduleTimeTable/>
    <CourseMaterial/>
    </div>
 
    </>
  )
}


export default Course