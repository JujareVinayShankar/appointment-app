// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleStar} = props
  const {id, title, date, isStarred} = eachAppointment

  const changeStar = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const clickStarred = () => {
    toggleStar(id)
  }
  return (
    <li className="list-item">
      <div className="top-title">
        <p className="appointment-heading">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="button"
          onClick={clickStarred}
        >
          <img src={changeStar} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
