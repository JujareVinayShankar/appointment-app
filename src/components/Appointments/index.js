// Write your code here
import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isStarredClicked: false,
  }

  createAppointment = () => {
    const filteredAppointmentList = this.getStarredAppointmentsList()
    return filteredAppointmentList.map(eachAppointment => (
      <AppointmentItem
        eachAppointment={eachAppointment}
        key={eachAppointment.id}
        toggleStar={this.toggleStar}
      />
    ))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ' '
    const appointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  setTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  setDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickButton = () => {
    const {isStarredClicked} = this.state
    this.setState({isStarredClicked: !isStarredClicked})
  }

  getStarredAppointmentsList = () => {
    const {appointmentList, isStarredClicked} = this.state
    if (isStarredClicked) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isStarredClicked} = this.state
    const starButton = isStarredClicked ? 'filled-star' : 'star-button'
    console.log(dateInput)
    console.log(this.appointmentList)
    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="top-container">
            <div className="left-container">
              <form className="form" onSubmit={this.getAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="TitleInput">TITLE</label>
                <input
                  className="title-input"
                  placeholder="Title"
                  id="TitleInput"
                  value={titleInput}
                  onChange={this.setTitle}
                />
                <label htmlFor="DateInput">DATE</label>
                <input
                  className="date-input"
                  id="DateInput"
                  type="date"
                  value={dateInput}
                  onChange={this.setDate}
                />
                <button className="submit-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-container">
            <div className="heading-container">
              <h1 className="heading">Appointments</h1>
              <button
                className={starButton}
                type="button"
                onClick={this.onClickButton}
              >
                Starred
              </button>
            </div>
            <div className="appointment">
              <ul className="unordered-list">{this.createAppointment()}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
