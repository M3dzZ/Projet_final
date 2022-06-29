import React, { useState } from 'react'
import Objective from '../../components/Objective/Objective'
import Card from '../../components/Card/Card'
import Image from '../../components/Image/Image'
import './Quests.scss'

function Daily() {
  const [state, setState] = useState('daily')
  return (
    <div className="quests-page">
      <div className="quests-page__header">
        <h3
          className="quests-page__header--title quests-page__header--target"
          onClick={() => setState('daily')}
        >
          Daily
        </h3>
        <h3
          className="quests-page__header--title quests-page__header--target"
          onClick={() => setState('event')}
        >
          Évènements
        </h3>
      </div>

      {(state === 'daily' && <Card />) || (state === 'event' && <Image />)}

      <div className="quests-page__footer">
        <div className="line"></div>
        <h3 className="quests-page__footer">Quêtes de la journée</h3>
        <div className="line"></div>
      </div>

      <div className="Card__quest__parent">
        <Objective />
        <Objective />
        <Objective />
        <Objective />
      </div>
    </div>
  )
}

export default Daily
