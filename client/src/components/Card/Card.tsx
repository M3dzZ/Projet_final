import icon from '../../assets/images/icon.svg'
import shoes from '../../assets/images/shoes.svg'
import './Card.scss'

function Card() {
  return (
    <div className="rectangle__card-container">
      <div className="header__card">
        <img src={icon} alt="" />
        <img src={icon} alt="" />
        <img src={icon} alt="" />
        <img src={icon} alt="" />
        <img src={icon} alt="" />
        <img src={icon} alt="" />
        <img src={icon} alt="" />
        <div id="card--locked">
          <div className="locker"></div>
          <img id="shoes" src={shoes} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Card
