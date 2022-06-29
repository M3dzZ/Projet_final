import image from '../../assets/images/img_event.png'
import './Image.scss'

function Image() {
  return (
    <div className="rectangle__card-container">
      <div className="rectangle__card__title">
        <p>Évènements près de chez vous</p>
      </div>
      <div className="rectangle__card">
        <img src={image} alt="" />
      </div>
    </div>
  )
}

export default Image
