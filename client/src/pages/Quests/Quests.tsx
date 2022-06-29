import React, { useState } from 'react'
import Card from '../../components/Card/Card'
import Event from '../../components/event/event'
import Dail from '../../components/daily/daily'
import Image from '../../components/Image/Image'
import './Quests.scss'

function Daily() {
  const [state, setState] = useState('daily')
  return (
    <div className="quests-page">
      <div className="quests-page__header">
        <h2 className="quests-page__header--title" onClick={() => setState('daily')}> Daily </h2>
        <h2 className="quests-page__header--title" onClick={() => setState('event')}> Évènements </h2>
      </div>

      {(state === 'daily' && <Card />) || (state === 'event' && <Image />)}

      <div className="quests-page__footer">
        <div className="quests-page__footer--line"></div>
        <h3 className="quests-page__footer--title">Quêtes de la journée</h3>
        <div className="quests-page__footer--line"></div>
      </div>

      {(state === 'daily' && <Dail />) || (state === 'event' && <Event />)}
      
    </div>
  )
}

export default Daily
