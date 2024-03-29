import { createElement, ReactElement, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const useCharacter = ({ playing: playingState }: { playing: boolean } = { playing: false }) => {
  const [characterSprites, setCharacterSprites] = useState<ReactElement<{ src: string }>[]>([])
  const [currentCharacterSprite, setCurrentCharacterSprite] = useState<ReactElement<{ src: string }>>()
  const [playing, setPlaying] = useState(playingState)
  const [animationSpeed, setAnimationSpeed] = useState(24)
  const [playerInterval, setPlayerInterval] = useState<number>()
  const [ready, setReady] = useState(false)
  const [walkDirection, setWalkDirection] = useState<'left' | 'right'>()

  const nextCharacterSprite = () => {
    const nextCharacterSprite = characterSprites[(currentCharacterSprite ? characterSprites.indexOf(currentCharacterSprite) + 1 : 0)]
    setCurrentCharacterSprite(nextCharacterSprite)
  }

  const prevCharacterSprite = () => {
    const prevCharacterSprite = characterSprites[(currentCharacterSprite ? characterSprites.indexOf(currentCharacterSprite) - 1 : 0)]
    setCurrentCharacterSprite(prevCharacterSprite)
  }

  const fetchCharacterSprites = async () => {
    const response = await axiosInstance.get<string[]>('/users/me/character')
    setCharacterSprites(response.data.map(url => {
      return createElement('img', { src: `data:image/png;base64,${url}` })
    }))
  }

  useEffect(() => {
    if (ready) {
      if (playing) {
        if (playerInterval) {
          window.clearInterval(playerInterval)
        }

        setPlayerInterval(window.setInterval(nextCharacterSprite, 1000 / animationSpeed))
      } else {
        clearInterval(playerInterval)
      }
    }
  }, [playing, animationSpeed, characterSprites, ready, currentCharacterSprite])

  useEffect(() => {
    fetchCharacterSprites().then()
  }, [])

  useEffect(() => {
    if (characterSprites.length > 0 && !currentCharacterSprite) {
      setCurrentCharacterSprite(characterSprites[0])
      setReady(true)
    }
  }, [characterSprites, currentCharacterSprite])

  return { currentCharacterSprite, playing, setPlaying, animationSpeed, setAnimationSpeed, nextCharacterSprite, prevCharacterSprite, walkDirection, setWalkDirection }
}

export default useCharacter
